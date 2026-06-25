import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import pluginVue from "eslint-plugin-vue"; //~ Добавляем официальный плагин Vue

export default [
  {
    // Папки-исключения
    ignores: ["dist/**", "node_modules/**", "public/**", "build/**", "temp/**"],
  },
  // Базовые рекомендации ESLint
  js.configs.recommended,
  
  //~ Автоматическая настройка правил для Vue 3 (Flat Config)
  ...pluginVue.configs["flat/recommended"],
  
  // Отключение конфликтующих с Prettier правил
  prettier,
  
  {
    //~ ИСПРАВЛЕНО: Теперь линтер заглядывает и во Vue-компоненты
    files: ["**/*.js", "**/*.mjs", "**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-debugger": "warn",
      "no-undef": "error",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          args: "after-used",
        },
      ],
      //~ Полезный доп для кастомных модулей: отключаем требование 
      //~ обязательно делать названия компонентов из двух слов (иначе он заругает App.vue или Tabs.vue)
      "vue/multi-word-component-names": "off"
    },
  },
];