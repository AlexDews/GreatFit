import { globSync } from "glob";
import path from "path";
import sharp from "sharp";
import chokidar from "chokidar";
import { access, readFile, writeFile, mkdir } from "fs/promises";
import crypto from "crypto";

const IMG_DIR = path.resolve(process.cwd(), "src/assets/images");
const IMG_GLOB_PATTERN = path.join(IMG_DIR, "**/*.{jpg,jpeg,png}").replace(/\\/g, "/");
const METADATA_FILE = "./scripts/meta/.images-meta.json";

// Глобальный объект для хранения кэша в памяти во время работы скрипта
let imageCache = {};

/* ================== UTILS ================== */

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getFileHash(filePath) {
  const content = await readFile(filePath);
  return crypto.createHash("md5").update(content).digest("hex");
}

/* ================== METADATA ================== */

async function loadMetadata() {
  try {
    const data = await readFile(METADATA_FILE, "utf-8");
    imageCache = JSON.parse(data);
  } catch {
    imageCache = {};
  }
}

async function saveMetadata() {
  try {
    await mkdir(path.dirname(METADATA_FILE), { recursive: true });
    await writeFile(METADATA_FILE, JSON.stringify(imageCache, null, 2), "utf-8");
  } catch (error) {
    console.error("❌ Не удалось сохранить метаданные изображений:", error.message);
  }
}

/* ================== CORE CONVERSION ================== */

/**
 * Конвертация одного изображения в AVIF и WebP с проверкой кэша
 * @param {string} imgPath - абсолютный путь к картинке
 * @param {boolean} isWatchEvent - флаг, если функция вызвана событием из chokidar
 */
async function convertSingleImage(imgPath, isWatchEvent = false) {
  try {
    const ext = path.extname(imgPath);
    const baseName = imgPath.slice(0, -ext.length);

    const avifPath = `${baseName}.avif`;
    const webpPath = `${baseName}.webp`;
    const jpegPath = `${baseName}.jpg`;

    const relativePath = path.relative(IMG_DIR, imgPath).replace(/\\/g, "/");
    const currentHash = await getFileHash(imgPath);

    // Проверяем: генерировали ли мы уже этот файл с таким же хэшем?
    const hasAvif = await fileExists(avifPath);
    const hasWebp = await fileExists(webpPath);

    if (imageCache[relativePath] === currentHash && hasAvif && hasWebp) {
      // Если это просто старт скрипта — молча скипаем. Если это событие watch — выводим инфо
      if (isWatchEvent) {
        console.log(`ℹ️  ${path.basename(imgPath)} не изменился (кэш совпадает)`);
      }
      return;
    }

    const image = sharp(imgPath);

    // Оптимизация: effort 4 — идеальный баланс скорости и веса
    await image.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
    await image.clone().avif({ quality: 65, effort: 6 }).toFile(avifPath);
    await image.clone().webp({ quality: 80, effort: 6 }).toFile(webpPath);

    // Записываем хэш в кэш
    imageCache[relativePath] = currentHash;

    // Если это одиночное добавление в watch-режиме, сразу обновляем json на диске
    if (isWatchEvent) {
      await saveMetadata();
    }

    console.log(`☑️  ${path.basename(imgPath)} -> AVIF & WebP оптимизированы`);
  } catch (error) {
    console.error(`❌ Ошибка файла ${path.basename(imgPath)}:`, error.message);
  }
}

/* ================== PROCESS ================== */

async function processImages() {
  const isWatchMode = process.argv.includes("--watch");

  // Загружаем сохраненный кэш перед стартом
  await loadMetadata();

  const files = globSync(IMG_GLOB_PATTERN, { nocase: true }).map((f) => f.replace(/\\/g, "/"));

  /**
   * 1. Первоначальная проверка и конвертация всех найденных файлов
   * Отрабатывает ВСЕГДА (и для once, и при старте watch, чтобы проверить изменившиеся файлы)
   */
  if (files.length > 0) {
    console.log(`🚀 Проверка кэша для ${files.length} изображений...`);
    for (const file of files) {
      await convertSingleImage(file, false);
    }
    // Сохраняем финальный кэш после массовой обработки
    await saveMetadata();
    console.log("✅ Обработка существующих изображений завершена!");
  } else if (!isWatchMode) {
    console.log("📂 Изображений для конвертации не найдено.");
  }

  /**
   * 2. Режим слежки (Watch Mode)
   */
  if (isWatchMode) {
    console.log("👀 LuminaNexus встал на дежурство (слежу за новыми и измененными images)...");

    const watcher = chokidar.watch(IMG_GLOB_PATTERN, {
      ignoreInitial: true, // Пропускаем стартовый проход, так как мы его обработали выше руками
      persistent: true,
      usePolling: true,
      interval: 100,
    });

    watcher.on("add", (filePath) => convertSingleImage(filePath.replace(/\\/g, "/"), true)).on("change", (filePath) => convertSingleImage(filePath.replace(/\\/g, "/"), true));
  }
}

processImages();
