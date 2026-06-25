import path from "path";
import fs from "fs";
import { copyFileSync, mkdirSync } from "fs";
import { globSync } from "glob";

export function mpaInputPlugin(srcDir, isHash) {
  const hashPart = isHash ? ".[hash]" : "";

  return {
    name: "custom-vue-output",

    config: (config) => {
      // 1. Для Vue (SPA) точкой входа является только один главный index.html
      if (!config.build) config.build = {};
      if (!config.build.rollupOptions) config.build.rollupOptions = {};

      config.build.rollupOptions.input = {
        main: path.resolve(srcDir, "index.html"),
      };

      // 2. Настраиваем Rollup для красивого и понятного вывода ассетов
      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,

        // Настройка для компилируемого JS
        entryFileNames: `assets/js/[name].min${hashPart}.js`,
        chunkFileNames: `assets/js/[name].min${hashPart}.js`,

        // Распределяем остальные файлы по полочкам
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]${hashPart}[extname]`;

          // Стили
          if (assetInfo.name.endsWith(".css")) {
            return `assets/css/[name].min${hashPart}[extname]`;
          }

          // Шрифты
          if (/\.(woff2|woff|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name][extname]`;
          }

          // Картинки
          if (/\.(png|jpe?g|svg|webp|gif|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]${hashPart}[extname]`;
          }

          return `assets/[name]${hashPart}[extname]`;
        },
      };
    },

    // 3. Копируем статику, которую твои фоновые скрипты сгенерировали в src/assets
    generateBundle(options) {
      const outDir = options.dir || path.join(process.cwd(), "dist");

      console.log("📦 [LuminaNexus] Копирование статических ресурсов в dist...");

      // Копирование шрифтов
      const fontDest = path.join(outDir, "assets/fonts");
      const fontFiles = globSync("src/assets/fonts/**/*.{woff2,woff}");
      if (fontFiles.length > 0) {
        mkdirSync(fontDest, { recursive: true });
        fontFiles.forEach((f) => {
          const dest = path.join(fontDest, path.basename(f));
          if (!fs.existsSync(dest)) copyFileSync(f, dest);
        });
        console.log("  ✅ Шрифты успешно перенесены");
      }

      // Копирование SVG-спрайта
      const spriteDest = path.join(outDir, "assets/images/sprite");
      const spriteFiles = globSync("src/assets/images/svg/sprite/*.svg");
      if (spriteFiles.length > 0) {
        mkdirSync(spriteDest, { recursive: true });
        spriteFiles.forEach((f) => {
          copyFileSync(f, path.join(spriteDest, path.basename(f)));
        });
        console.log("  ✅ SVG-спрайт скопирован");
      }

      // Копирование обработанных картинок (чтобы точно ничего не потерялось)
      const imagesDest = path.join(outDir, "assets/images");
      const imageFiles = globSync("src/assets/images/*.{jpg,jpeg,png,webp,avif}");
      if (imageFiles.length > 0) {
        mkdirSync(imagesDest, { recursive: true });
        imageFiles.forEach((f) => {
          const dest = path.join(imagesDest, path.basename(f));
          if (!fs.existsSync(dest)) copyFileSync(f, dest);
        });
        console.log("  ✅ Оптимизированные изображения на месте");
      }
    },
  };
}
