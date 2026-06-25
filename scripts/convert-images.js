import { globSync } from "glob";
import path from "path";
import sharp from "sharp";
import chokidar from "chokidar";
import { access } from "fs/promises";

const IMG_DIR = path.resolve(process.cwd(), "src/assets/images");
const IMG_GLOB_PATTERN = path.join(IMG_DIR, "**/*.{jpg,jpeg,png}").replace(/\\/g, "/");

/**
 * Проверка существования файла на диске
 */
async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Конвертация одного изображения в AVIF и WebP
 * @param {string} imgPath - абсолютный путь к картинке
 * @param {boolean} force - если true, принудительно перезапишет файлы (для watch режима)
 */
async function convertSingleImage(imgPath, force = false) {
  try {
    const ext = path.extname(imgPath);
    const baseName = imgPath.slice(0, -ext.length);

    const avifPath = `${baseName}.avif`;
    const webpPath = `${baseName}.webp`;

    // Если файлы уже существуют и мы НЕ в режиме принудительного обновления — пропускаем
    if (!force) {
      const hasAvif = await fileExists(avifPath);
      const hasWebp = await fileExists(webpPath);
      if (hasAvif && hasWebp) return;
    }

    const image = sharp(imgPath);

    // Оптимизация: effort 4 — идеальный баланс скорости и веса
    await image.clone().avif({ quality: 90, effort: 4 }).toFile(avifPath);
    await image.clone().webp({ quality: 90, effort: 4 }).toFile(webpPath);

    console.log(`☑️  ${path.basename(imgPath)} -> AVIF & WebP оптимизированы`);
  } catch (error) {
    console.error(`❌ Ошибка файла ${path.basename(imgPath)}:`, error.message);
  }
}

/**
 * Основная логика процесса
 */
async function processImages() {
  const isWatchMode = process.argv.includes("--watch");

  /**
   * 1. Начальная конвертация (отрабатывает при npm run img:once или перед запуском dev)
   */
  if (!isWatchMode) {
    const files = globSync(IMG_GLOB_PATTERN, { nocase: true });

    if (files.length > 0) {
      console.log(`🚀 Начинаем обработку ${files.length} изображений...`);
      for (const file of files) {
        await convertSingleImage(file, false); // Кэш работает
      }
      console.log("✅ Начальная конвертация завершена!");
    } else {
      console.log("📂 Изображений для конвертации не найдено.");
    }
  }

  /**
   * 2. Режим слежки (Watch Mode)
   */
  if (isWatchMode) {
    console.log("👀 LuminaNexus встал на дежурство (слежу за images)...");

    const watcher = chokidar.watch(IMG_GLOB_PATTERN, {
      ignoreInitial: true,
      persistent: true,
      usePolling: true, 
      interval: 100,
    });

    watcher
      .on("add", (filePath) => convertSingleImage(filePath, true))
      .on("change", (filePath) => convertSingleImage(filePath, true));
  }
}

processImages();