import { webfont } from "webfont";
import { writeFile, mkdir, readFile } from "fs/promises";
import { globSync } from "glob";
import path from "path";
import crypto from "crypto";
import fs from "fs";
// ВОТ ОН, РОДНОЙ:
import outlineStroke from "svg-outline-stroke";

/* ================== CONFIG ================== */

const FONT_NAME = "LuminaIcons";
const SRC = "src/assets/icon-fonts/*.svg";
const DEST_FONTS = "src/assets/fonts";
const DEST_SCSS = "src/scss/global/icon-fonts.scss";
const JSON_DEST = "src/styleguide/json";
const METADATA_FILE = "./scripts/meta/.iconfont-meta.json";

// Префикс для шрифтовых иконок
const PREFIX = "icon-f-";

/* ================== UTILS ================== */

async function getFileHash(filePath) {
  const content = await readFile(filePath, "utf-8");
  return crypto.createHash("md5").update(content).digest("hex");
}

async function getDirectoryHash(files) {
  const hashes = await Promise.all(
    files.map(async (file) => {
      const hash = await getFileHash(file);
      const stats = fs.statSync(file);
      return `${file}:${hash}:${stats.mtimeMs}`;
    }),
  );
  return crypto.createHash("md5").update(hashes.sort().join("|")).digest("hex");
}

/* ================== METADATA ================== */

async function saveMetadata(files) {
  const directoryHash = await getDirectoryHash(files);
  const fileMeta = await Promise.all(
    files.map(async (file) => ({
      name: path.parse(file).name,
      hash: await getFileHash(file),
      modified: fs.statSync(file).mtimeMs,
    })),
  );

  const meta = {
    timestamp: Date.now(),
    directoryHash,
    files: fileMeta,
  };

  await mkdir(path.dirname(METADATA_FILE), { recursive: true });
  await writeFile(METADATA_FILE, JSON.stringify(meta, null, 2));
}

async function loadMetadata() {
  try {
    const data = await readFile(METADATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/* ================== UPDATE CHECK ================== */

async function _needUpdate(files) {
  const oldMeta = await loadMetadata();
  if (!oldMeta) return true;

  const newHash = await getDirectoryHash(files);
  if (oldMeta.directoryHash === newHash) {
    console.log("✅ Шрифт иконок актуальный, изменений нет.");
    return false;
  }

  console.log("🔄 Обнаружены изменения в иконках, пересобираю шрифт...");
  return true;
}

/* ================== FLATTER CLEANUP ================== */

function optimizeSvgCode(content) {
  return (
    content
      // Теперь это безопасно, так как все stroke уже стали физическим fill-контуром
      .replace(/(fill|stroke)="[^"]*"/gi, "")
      .replace(/(id|data-name)="[^"]*"/gi, "")
      .replace(/<g[^>]*>/gi, "")
      .replace(/<\/g>/gi, "")
  );
}

/* ================== GENERATION ================== */

async function generateIcons() {
  try {
    const files = globSync(SRC).map((f) => f.replace(/\\/g, "/"));
    if (!files.length) return console.error("❌ SVG не найдены в " + SRC);

    const needUpdate = await _needUpdate(files);
    if (!needUpdate) return;

    console.log(`🔄 Конвертация stroke и генерация шрифта: ${files.length} иконок...`);

    const tempDir = path.resolve("./scripts/meta/.temp-clean-svg");
    await mkdir(tempDir, { recursive: true });

    const cleanFiles = [];
    for (const file of files) {
      const originalContent = await readFile(file, "utf-8");

      let processedContent = originalContent;

      // Если в иконке есть линии, плагин автоматически перерисует их в контуры
      if (originalContent.includes("stroke=")) {
        try {
          processedContent = await outlineStroke(originalContent, {
            outlineStroke: "always",
          });
        } catch (err) {
          console.warn(`⚠️ Не удалось конвертировать stroke для ${path.basename(file)}:`, err);
        }
      }

      // Чистим полученный результат регулярками
      const cleanContent = optimizeSvgCode(processedContent);

      const tempFilePath = path.join(tempDir, path.basename(file)).replace(/\\/g, "/");

      await writeFile(tempFilePath, cleanContent);
      cleanFiles.push(tempFilePath);
    }

    // Скармливаем webfont идеально подготовленные файлы
    const result = await webfont({
      files: cleanFiles,
      fontName: FONT_NAME,
      formats: ["woff", "woff2"],
      sort: true,
      normalize: true,
      fontHeight: 1000,
    });

    await fs.promises.rm(tempDir, { recursive: true, force: true });

    await mkdir(DEST_FONTS, { recursive: true });
    await mkdir(path.dirname(DEST_SCSS), { recursive: true });

    const fontPath = "../../assets/fonts/";

    let scss = `// Генерируемый файл. Не редактировать вручную!
@use "sass:map";

@font-face {
  font-family: "${FONT_NAME}";
  src: url("${fontPath}${FONT_NAME}.woff2") format("woff2"), 
       url("${fontPath}${FONT_NAME}.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

%icon-base {
  font-family: "${FONT_NAME}" !important;
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 1;
  text-align: center;
  vertical-align: middle;

  transform-origin: center center; 

  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Карта иконок
$icon-map: (\n`;

    let classes = "";
    result.glyphsData.forEach(({ metadata: { name, unicode } }) => {
      const code = unicode[0].charCodeAt(0).toString(16).toUpperCase();
      scss += `  "${name}": "\\${code}",\n`;
      classes += `.${PREFIX}${name}::before {
  @extend %icon-base;
  content: "\\${code}";
}\n\n`;
    });

    scss += `);

@function get-icon($name) {
  @if map.has-key($icon-map, $name) {
    @return map.get($icon-map, $name);
  }
  @else {
    @warn "Иконка '#{$name}' не найдена в шрифте ${FONT_NAME}";
    @return null;
  }
}\n\n`;

    const finalScss = scss + classes;

    await Promise.all([writeFile(`${DEST_FONTS}/${FONT_NAME}.woff`, result.woff), writeFile(`${DEST_FONTS}/${FONT_NAME}.woff2`, result.woff2), writeFile(DEST_SCSS, finalScss)]);

    const fontIconsData = result.glyphsData.map(({ metadata: { name, unicode } }) => ({
      name: name,
      code: unicode[0].charCodeAt(0).toString(16).toUpperCase(),
      char: unicode[0],
    }));

    await mkdir(JSON_DEST, { recursive: true });
    await writeFile(path.join(JSON_DEST, "font-icons.json"), JSON.stringify(fontIconsData, null, 2));

    await saveMetadata(files);

    console.log(`🚀 [LuminaNexus Font] Сгенерировано ${files.length} иконок.`);
    console.log(`✅ JSON для Font-иконок создан: ${path.join(JSON_DEST, "font-icons.json")}`);
  } catch (e) {
    console.error("❌ Ошибка генерации шрифта:", e);
  }
}

generateIcons();
