import { imagePlugins } from "./images";
import { buildToolsPlugins } from "./build-tools";
import { mpaInputPlugin } from "./mpa-input";
import { lintersPlugins } from "./linters.js";

export const createVitePlugins = (srcDir, isHash, inlineBuild, enablePwa) => {
  return [
    ...imagePlugins,
    ...buildToolsPlugins(enablePwa), // Оставили архиватор и PWA
    mpaInputPlugin(srcDir, isHash), // Наш обновленный сборщик в dist
    ...lintersPlugins, // Наш зоркий контроль качества (Vue + SCSS)
  ];
};
