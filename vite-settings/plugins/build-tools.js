import { VitePWA as pwaPlugin } from "vite-plugin-pwa";
import zipPlugin from "vite-plugin-zip-pack";

export const buildToolsPlugins = (enablePwa) =>
  [
    // 1. PWA оставляем — если нужно сделать веб-приложение, штука полезная
    enablePwa && pwaPlugin(),

    // 2. Архиватор оставляем — автоматом пакует dist в archive.zip для передачи заказчику
    zipPlugin({
      outDir: "dist",
      outFileName: "archive.zip",
    }),
  ].filter(Boolean);
