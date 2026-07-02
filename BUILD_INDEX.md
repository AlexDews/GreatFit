# Индекс сборки проекта

## Общая информация
- **Название**: luminanexus
- **Версия**: 1.0.0
- **Фреймворк**: Vue 3 + Vite 7.3.0
- **Тип**: Модульная сборка (ESM)

## Конфигурация сборки

### Основные параметры
- **Кеширование (IS_HASH)**: `true`
- **PWA (ENABLE_PWA)**: `false`
- **StyleGuide (SHOW_STYLEGUIDE)**: `true`
- **Выходная директория**: `dist`
- **Base**: `./`

### Плагины Vite
- `@vitejs/plugin-vue` - обработка Vue компонентов
- `vite-plugin-checker` - проверка типов и кода
- `vite-plugin-image-optimizer` - оптимизация изображений
- `vite-plugin-pwa` - PWA поддержка (отключено)
- `vite-plugin-zip-pack` - упаковка в ZIP
- `styleguidePlugin` - генерация стильгайда

### Алиасы
Импорты настроены через `vite-settings/aliases.js`

### SCSS конфигурация
- Автопрефиксер включён
- Дополнительные импорты:
  - `@/scss/utils/settings`
  - `@/scss/utils/mixins`
- Поддержка `import` в SCSS

## Структура проекта

```
src/
├── App.vue                 # Корневой компонент (RouterView)
├── main.js                 # Точка входа
├── assets/                 # Статические ассеты
│   ├── fonts/             # Шрифты
│   ├── icon-fonts/        # Иконки-шрифты
│   ├── icons/             # SVG иконки
│   └── images/            # Изображения
├── components/            # Компоненты
│   ├── HomePage.vue       # Главная страница
│   ├── modules/           # Модульные компоненты
│   │   ├── datepicker/    # Выбор даты
│   │   │   ├── AppDatepicker.vue
│   │   │   └── datepicker.config.js
│   │   ├── forms/         # Формы
│   │   │   ├── AppRating.vue
│   │   │   ├── AppSelect.vue
│   │   │   ├── forms.config.js
│   │   │   └── useFormValidation.js
│   │   ├── maps/          # Карты
│   │   │   ├── AppMap.vue
│   │   │   └── maps.config.js
│   │   ├── marquee/       # Бегущая строка
│   │   │   ├── AppMarquee.vue
│   │   │   └── marquee.config.js
│   │   ├── popup/         # Модальные окна
│   │   │   ├── AppPopup.vue
│   │   │   ├── popup.config.js
│   │   │   └── popupStore.js
│   │   ├── range/         # Ползунок диапазона
│   │   │   ├── AppRange.vue
│   │   │   └── range.config.js
│   │   ├── scroll/        # Скролл
│   │   │   ├── scroll.config.js
│   │   │   └── scrollService.js
│   │   ├── showmore/      # Показать ещё
│   │   │   ├── AppShowMore.vue
│   │   │   └── showmore.config.js
│   │   ├── spollers/      # Спуллеры/аккордеон
│   │   │   ├── AppSpollerItem.vue
│   │   │   ├── AppSpollers.vue
│   │   │   └── spollers.config.js
│   │   ├── swiper/        # Слайдер
│   │   │   ├── AppSlider.vue
│   │   │   └── swiper.config.js
│   │   └── tabs/          # Вкладки
│   │       ├── AppTabs.vue
│   │       └── tabs.config.js
│   └── ui/                # Базовые UI компоненты
│       ├── TheFooter.vue
│       └── TheHeader.vue
├── core/                  # Ядро приложения
│   ├── helpers.js         # Вспомогательные функции
│   ├── router.js          # Маршрутизация (Vue Router)
│   ├── system.config.js   # Системная конфигурация
│   ├── useBodyLock.js     # Блокировка скролла body
│   ├── useBurger.js       # Меню-бургер
│   └── useSystemInit.js   # Инициализация системы
├── scss/                  # Стили
│   ├── style.scss         # Главный файл стилей
│   ├── global/            # Глобальные стили
│   │   └── fonts.scss
│   └── utils/             # SCSS утилиты
│       ├── settings
│       └── mixins
└── styleguide/            # Стильгайд
    ├── styleguide.scss
    ├── StyleguidePage.vue
    ├── json/
    └── scss/
```

## Зависимости

### Production
- `vue` ^3.5.13
- `vue-router` ^4.6.4
- `swiper` ^12.0.3
- `imask` ^7.6.1
- `vue-imask` ^7.6.1
- `nouislider` ^15.8.1

### Development
- `vite` 7.3.0
- `@vitejs/plugin-vue` ^6.0.0
- `sass` 1.97.1
- `eslint` 10.6.0
- `stylelint` 16.26.1
- `sharp` 0.34.5
- `svg-sprite` 2.0.4
- `concurrently` 9.2.1
- `husky` 8.0.0

## Скрипты сборки

| Скрипт | Описание |
|--------|----------|
| `npm run dev` | Режим разработки с watch-режимом изображений |
| `npm run build` | Полная сборка (ассеты + Vite) |
| `npm run assets` | Генерация ассетов (шрифты, иконки, спрайты, изображения) |
| `npm run fonts` | Конвертация шрифтов |
| `npm run icons` | Генерация иконок-шрифтов |
| `npm run sprite` | Генерация SVG спрайта |
| `npm run img:once` | Оптимизация изображений (однократно) |
| `npm run img:watch` | Оптимизация изображений (watch) |
| `npm run preview` | Превью сборки |
| `npm run lint` | ESLint проверка |
| `npm run style` | Stylelint проверка |

## Модульная архитектура

### Модули (src/components/modules/)
Каждый модуль содержит:
- Vue компонент(ы)
- Конфигурационный файл (`*.config.js`)
- При необходимости: хранилище, composables, сервисы

**Доступные модули:**
1. **datepicker** - выбор даты
2. **forms** - формы с валидацией (rating, select)
3. **maps** - интеграция карт
4. **marquee** - бегущая строка
5. **popup** - модальные окна с хранилищем
6. **range** - ползунок диапазона
7. **scroll** - сервис скролла
8. **showmore** - раскрытие контента
9. **spollers** - аккордеон
10. **swiper** - слайдер
11. **tabs** - вкладки

### UI компоненты (src/components/ui/)
- `TheHeader` - шапка сайта
- `TheFooter` - подвал сайта

## Инструменты обработки ассетов

### Скрипты (scripts/)
- `convert-fonts.js` - конвертация шрифтов (WOFF2)
- `convert-images.js` - оптимизация изображений (Sharp)
- `icon-fonts.js` - генерация иконок-шрифтов (webfont)
- `svg-sprite.js` - генерация SVG спрайта

## Браузерная поддержка
- Последние 2 версии
- Не мёртвые браузеры
- > 0.2% глобального usage

## Особенности
- Модульная архитектура с изолированными конфигами
- SCSS с препроцессором и автопрефиксером
- Husky для Git hooks
- Поддержка PWA (отключена по умолчанию)
- Styleguide для документации компонентов
- Оптимизация изображений через Sharp
- TypeScript-проверка через vite-plugin-checker

---
*Индекс сгенерирован: 2025-06-30*