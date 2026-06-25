import checker from "vite-plugin-checker";

export const lintersPlugins = [
  checker({
    // ===== НАСТРОЙКА ESLINT (Скрипты и Vue) =====
    eslint: {
      useFlatConfig: true,
      // --no-error-on-unmatched-pattern защищает от падения, если нет чистых .js файлов
      lintCommand: 'eslint "src/**/*.{js,vue}" --no-error-on-unmatched-pattern',
    },

    // ===== НАСТРОЙКА STYLELINT (Стили и Vue) =====
    stylelint: {
      // --allow-empty-input защищает от падения, если линтер считает маску пустой на Windows
      lintCommand: 'stylelint "src/**/*.{scss,css,vue}" --allow-empty-input',
    },
  }),
];
