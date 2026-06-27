import { webfont } from "webfont";
import { writeFile, mkdir, readFile } from "fs/promises";
import { globSync } from "glob";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const FONT_NAME = "LuminaIcons";
const SRC = "src/assets/icon-fonts/*.svg";
const DEST_FONTS = "src/assets/fonts";
const DEST_SCSS = "src/scss/utils/icon-fonts.scss";
const JSON_DEST = "src/styleguide/json";
const METADATA_FILE = "src/styleguide/json/.font-meta.json";

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

async function generateIcons() {
  try {
    const files = globSync(SRC).map((f) => f.replace(/\\/g, "/"));
    if (!files.length) return console.error("❌ SVG не найдены в " + SRC);

    const needUpdate = await _needUpdate(files);
    if (!needUpdate) return;

    console.log(`🔄 Генерация шрифта: ${files.length} иконок...`);

    const result = await webfont({
      files,
      fontName: FONT_NAME,
      formats: ["woff", "woff2"],
      sort: true,
    });

    await mkdir(DEST_FONTS, { recursive: true });
    await mkdir(path.dirname(DEST_SCSS), { recursive: true });
    
    const fontPath = "../assets/fonts/";

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
  font-family: ${FONT_NAME};
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Карта иконок
$icon-map: (\n`;

    let classes = "";
    result.glyphsData.forEach(({ metadata: { name, unicode } }) => {
      const code = unicode[0].charCodeAt(0).toString(16).toUpperCase();
      scss += `  "${name}": "\\${code}",\n`;
      classes += `.--icon-${name}::before {
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

    await Promise.all([
      writeFile(`${DEST_FONTS}/${FONT_NAME}.woff`, result.woff),
      writeFile(`${DEST_FONTS}/${FONT_NAME}.woff2`, result.woff2),
      writeFile(DEST_SCSS, finalScss)
    ]);

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