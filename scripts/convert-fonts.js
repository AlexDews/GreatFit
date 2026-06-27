import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import { globSync } from "glob";
import path from "path";
import { compress } from "woff2-encoder";

const FONTS_DIR = path.resolve(process.cwd(), "src/assets/fonts");
const DEST_SCSS = path.resolve(process.cwd(), "src/scss/global/fonts.scss");
const DEST_JSON = path.resolve(process.cwd(), "src/styleguide/json/fonts.json");

const getWeight = (name) => {
  const weights = {
    thin: 100,
    hairline: 100,
    extralight: 200,
    ultralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };
  const lowerName = name.toLowerCase().replace(/[-_]/g, "");
  const found = Object.keys(weights).find((w) => lowerName.includes(w));
  return weights[found] || 400;
};

async function processFonts() {
  try {
    // 1. Конвертируем только новые исходники (если они физически есть в папке)
    const sources = globSync(path.join(FONTS_DIR, "*.{ttf,otf}").replace(/\\/g, "/"));

    if (sources.length > 0) {
      console.log(`🚀 Найдено новых исходников: ${sources.length}. Конвертирую в WOFF2...`);
      for (const fontPath of sources) {
        const fileName = path.basename(fontPath, path.extname(fontPath));
        const woff2Path = path.join(FONTS_DIR, `${fileName}.woff2`);

        const input = await readFile(fontPath);
        const output = await compress(input);
        await writeFile(woff2Path, output);
        await unlink(fontPath);
        console.log(`✅ Сконвертирован: ${fileName}`);
      }
    }

    // 2. Генерируем конфиги на основе ВСЕХ woff2 файлов (срабатывает всегда, даже при пустом Git-диффе)
    const woff2Files = globSync(path.join(FONTS_DIR, "*.woff2").replace(/\\/g, "/"));

    if (woff2Files.length === 0) {
      console.log("ℹ️  В папке src/assets/fonts нет шрифтов WOFF2. Пропускаю генерацию конфигов.");
      return;
    }

    let scssContent = "";
    const fontsJson = [];

    woff2Files.sort().forEach((fontPath) => {
      const fileName = path.basename(fontPath, ".woff2");
      if (fileName === "icons") return; // Пропускаем иконки

      const familyName = fileName.split("-")[0].split("_")[0];
      const weight = getWeight(fileName);
      const isItalic = fileName.toLowerCase().includes("italic");

      // Путь `../` верный, так как сборка стилей идет от лица файла src/scss/style.scss
      scssContent += `@font-face {
  font-family: ${familyName};
  font-display: swap;
  src: url("../assets/fonts/${fileName}.woff2") format("woff2");
  font-weight: ${weight};
  font-style: ${isItalic ? "italic" : "normal"};
}\n\n`;

      // Сборка JSON структуры для Styleguide
      let fontEntry = fontsJson.find(f => f.family === familyName);
      if (!fontEntry) {
        fontEntry = {
          name: familyName,
          family: familyName,
          weights: [],
          sample: "The quick brown fox jumps over the lazy dog"
        };
        fontsJson.push(fontEntry);
      }

      if (!fontEntry.weights.includes(weight)) {
        fontEntry.weights.push(weight);
      }
      if (isItalic && !fontEntry.weights.includes("italic")) {
        fontEntry.weights.push("italic");
      }
    });

    // Запись сгенерированного SCSS
    await mkdir(path.dirname(DEST_SCSS), { recursive: true });
    await writeFile(DEST_SCSS, scssContent);
    console.log(`✨ Обновлен файл: fonts.scss`);

    // Запись сгенерированного JSON для Стайл гайда
    await mkdir(path.dirname(DEST_JSON), { recursive: true });
    await writeFile(DEST_JSON, JSON.stringify(fontsJson, null, 2));
    console.log(`✨ Обновлен файл: fonts.json (${fontsJson.length} уникальных семейств)`);

  } catch (error) {
    console.error("❌ Ошибка в скрипте шрифтов:", error.message);
  }
}

processFonts();