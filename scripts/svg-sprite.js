import SVGSpriter from "svg-sprite";
import { globSync } from "glob";
import { readFile, writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import crypto from "crypto";

/* ================== CONFIG ================== */

const SRC = {
  mono: "src/assets/icons/mono/*.svg",
  stroke: "src/assets/icons/stroke/*.svg",
  multi: "src/assets/icons/multi/*.svg",
};

const DEST = {
  sprite: "src/assets/images/sprite",
  json: "src/styleguide/json",
  scss: "src/styleguide/scss",
};

const SPRITE_NAME = "sprite.svg";
const PREFIX = "--icon-";
const METADATA_FILE = "src/styleguide/json/.sprite-meta.json";

/* ================== UTILS ================== */

async function getFileHash(filePath) {
  const content = await readFile(filePath);
  return crypto.createHash("md5").update(content).digest("hex");
}

async function getDirectoryHash(files) {
  const entries = await Promise.all(
    files.map(async (file) => {
      const [hash, stats] = await Promise.all([getFileHash(file), stat(file)]);
      return `${file}:${hash}:${stats.mtimeMs}`;
    }),
  );

  return crypto.createHash("md5").update(entries.sort().join("|")).digest("hex");
}

/* ================== METADATA ================== */

async function loadMetadata() {
  try {
    return JSON.parse(await readFile(METADATA_FILE, "utf-8"));
  } catch {
    return null;
  }
}

async function saveMetadata(files) {
  const directoryHash = await getDirectoryHash(files);

  const filesMeta = await Promise.all(
    files.map(async (file) => {
      const stats = await stat(file);
      return {
        name: path.parse(file).name,
        hash: await getFileHash(file),
        modified: stats.mtimeMs,
      };
    }),
  );

  await mkdir(path.dirname(METADATA_FILE), { recursive: true });
  await writeFile(
    METADATA_FILE,
    JSON.stringify(
      {
        timestamp: Date.now(),
        directoryHash,
        files: filesMeta,
      },
      null,
      2,
    ),
  );
}

/* ================== UPDATE CHECK ================== */

async function shouldUpdateSprite(files) {
  const oldMeta = await loadMetadata();
  if (!oldMeta) return true;

  const newHash = await getDirectoryHash(files);
  if (newHash === oldMeta.directoryHash) {
    console.log("✅ Спрайт актуальный, изменений нет.");
    return false;
  }

  console.log("🔄 Обнаружены изменения в иконках, пересборка спрайта...");
  return true;
}

/* ================== SPRITE GENERATION ================== */

async function generateSprite() {
  const monoFiles = globSync(SRC.mono);
  const strokeFiles = globSync(SRC.stroke);
  const multiFiles = globSync(SRC.multi);

  const allFiles = [...monoFiles, ...strokeFiles, ...multiFiles];
  if (!allFiles.length) {
    console.error("❌ SVG-иконки не найдены в исходных папках.");
    return;
  }

  if (!(await shouldUpdateSprite(allFiles))) return;

  console.log(`🔄 Генерация спрайта (${allFiles.length} иконок)...`);

  const spriter = new SVGSpriter({
    mode: {
      symbol: { sprite: SPRITE_NAME },
    },
    shape: {
      id: {
        generator: (name) => `${PREFIX}${path.parse(name).name}`,
      },
      //~ ИСПРАВЛЕНО: Современный формат конфигурации плагинов SVGO v2/v3
      transform: [
        {
          svgo: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false, // Железно сохраняем viewBox для адаптивности
                  },
                },
              },
              "removeXMLNS", // Удаляем лишние пространства имен из тегов symbol
            ],
          },
        },
      ],
    },
  });

  /* ===== MONO ===== */
  for (const file of monoFiles) {
    let content = await readFile(file, "utf-8");
    content = content.replace(/(fill|stroke)="[^"]*"/gi, "");
    spriter.add(path.resolve(file), path.basename(file), content);
  }

  /* ===== STROKE ===== */
  for (const file of strokeFiles) {
    let content = await readFile(file, "utf-8");
    content = content.replace(/fill="[^"]*"/gi, 'fill="none"').replace(/stroke="[^"]*"/gi, 'stroke="currentColor"');
    spriter.add(path.resolve(file), path.basename(file), content);
  }

  /* ===== MULTI ===== */
  for (const file of multiFiles) {
    spriter.add(path.resolve(file), path.basename(file), await readFile(file, "utf-8"));
  }

  /* ===== COMPILE ===== */
  let spriteContent;
  try {
    const result = await spriter.compileAsync();
    //~ ИСПРАВЛЕНО: Безопасное обращение к публичному свойству .contents без приватного _contents
    const spriteFile = result.result?.symbol?.sprite;
    
    if (spriteFile && spriteFile.contents) {
      spriteContent = spriteFile.contents.toString("utf-8");
    }

    if (!spriteContent) throw new Error("Пустой результат компиляции");
  } catch (e) {
    console.error("❌ Ошибка компиляции спрайта:", e.message);
    return;
  }

  /* ===== WRITE FILES ===== */
  await Promise.all([
    mkdir(DEST.sprite, { recursive: true }), 
    mkdir(DEST.scss, { recursive: true }), 
    mkdir(DEST.json, { recursive: true })
  ]);

  await writeFile(path.join(DEST.sprite, SPRITE_NAME), spriteContent);

  const iconNames = allFiles.map((f) => path.parse(f).name);

  /* ===== SCSS ===== */
  await writeFile(
    path.join(DEST.scss, "sprite-map.scss"),
    `// AUTO-GENERATED — DO NOT EDIT
$sprite-prefix: "${PREFIX}";
$icons: (
${iconNames.map((n) => `  "${n}"`).join(",\n")}
);

@mixin icon($name) {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  stroke: currentColor;

  &.icon-stroke {
    fill: none !important;
  }

  &.icon-multi {
    fill: initial;
    stroke: initial;
  }
}
`,
  );

  /* ===== JSON ===== */
  await writeFile(
    path.join(DEST.json, "svg-icons.json"),
    JSON.stringify(
      iconNames.map((name) => ({
        name,
        id: `${PREFIX}${name}`,
      })),
      null,
      2,
    ),
  );

  await saveMetadata(allFiles);

  console.log(`🚀 Sprite Engine отработал успешно:
  ✅ Всего упаковано: ${allFiles.length}
  🟢 Mono (чистый цвет): ${monoFiles.length}
  🟡 Stroke (контурные): ${strokeFiles.length}
  🔵 Multi (цветные): ${multiFiles.length}`);
}

generateSprite();