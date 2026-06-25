import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export const imagePlugins = [
  ViteImageOptimizer({
    // Отключаем сжатие для того, что уже пожал Sharp
    jpeg: { quality: 100 },
    webp: { quality: 100 },
    avif: { quality: 100 },
    png: { quality: 80 }, // Можно оставить, если Sharp их не трогает
    svg: {
      plugins: [{ name: "removeViewBox", active: false }],
    },
  }),
];
