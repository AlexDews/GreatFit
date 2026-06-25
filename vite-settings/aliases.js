import path from "path";

const currentDir = import.meta.dirname;

function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

export const aliases = {
  "@": normalizePath(path.resolve(currentDir, "../src")),
  "@components": normalizePath(path.resolve(currentDir, "../src/components")),
  "@modules": normalizePath(path.resolve(currentDir, "../src/components/modules")),
  "@icons": normalizePath(path.resolve(currentDir, "../src/assets/icon-fonts")),
  "@images": normalizePath(path.resolve(currentDir, "../src/assets/images")),
  "@styles": normalizePath(path.resolve(currentDir, "../src/scss")),
  "@assets": normalizePath(path.resolve(currentDir, "../src/assets")),
  "@fonts": normalizePath(path.resolve(currentDir, "../src/assets/fonts")),
};
