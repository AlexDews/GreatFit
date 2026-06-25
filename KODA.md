# KODA.md — Инструкции для работы с проектом

## Обзор проекта

**Название:** LUMINA NEXUS  
**Тип:** Веб-приложение (фронтенд) на базе Vite  
**Технологии:** JavaScript (ES6+), SCSS, Vite, Swiper, iMask, noUiSlider  
**Архитектура:** Модульная (ModuX — Modular UX Engine)

Проект представляет собой современную фронтенд-экосистему с готовыми модулями для типовых интерфейсных элементов: слайдеры, формы, попапы, табы, спойлеры и другие.

---

## Ключевые команды

| Команда | Описание |
|---------|----------|
| `npm install` | Установка зависимостей |
| `npm run dev` | Запуск dev-сервера (автоматически конвертирует шрифты, иконки и изображения) |
| `npm run build` | Production-сборка в папку `dist/` |
| `npm run preview` | Preview собранного проекта |
| `npm run lint` | Проверка JS (ESLint) с автоисправлением |
| `npm run style` | Проверка SCSS (Stylelint) с автоисправлением |
| `npm run assets` | Конвертация всех ресурсов (шрифты + иконки + изображения) |
| `npm run fonts` | Конвертация шрифтов в веб-форматы |
| `npm run icons` | Создание иконочного шрифта из SVG |
| `npm run sprite` | Генерация SVG-спрайта |
| `npm run img:once` | Конвертация изображений однократно |
| `npm run img:watch` | Конвертация изображений с отслеживанием изменений |

---

## Структура проекта

```
ModuX/
├── src/
│   ├── assets/              # Статические ресурсы
│   │   ├── fonts/           # Шрифты проекта
│   │   ├── icons/           # SVG-иконки для спрайта
│   │   └── images/          # Изображения (автоматически конвертируются в AVIF/WebP)
│   ├── html/
│   │   ├── layout/          # Layout-файлы: header.html, footer.html, contacts.html
│   │   ├── components/      # Переиспользуемые компоненты (хедер, футер)
│   │   └── styleguide/      # Документация модулей
│   ├── js/
│   │   ├── main.js          # Точка входа (подключение модулей)
│   │   ├── modules/         # Модули проекта
│   │   │   ├── slider.js    # Слайдер на Swiper (адаптивный: мобильный/десктоп)
│   │   │   ├── popup/       # Модальные окна
│   │   │   ├── forms/       # Работы с формами, валидация, маски
│   │   │   ├── spollers/    # Аккордеоны
│   │   │   ├── tabs/        # Табы
│   │   │   └── ...          # Другие модули
│   │   └── styleguide/
│   ├── scss/
│   │   ├── style.scss       # Главный файл стилей (точка входа)
│   │   ├── utils/           # Утилиты
│   │   │   ├── settings.scss # Переменные (цвета, шрифты, breakpoints)
│   │   │   ├── mixins.scss   # Миксины (adaptiveValue, gridCards, bg)
│   │   │   ├── null.scss     # Reset CSS
│   │   │   └── base.scss     # Базовые стили
│   │   ├── modules/         # Стили модулей (swiper, popup, forms и т.д.)
│   │   ├── components/      # Компоненты (button, input)
│   │   └── layout/          # Стили блоков (header, footer, contact)
│   └── index.html           # Главная страница
├── vite-settings/           # Конфигурация Vite плагинов
│   ├── aliases.js          # Настройка алиасов путей
│   └── plugins/            # Плагины Vite
├── scripts/                # Скрипты конвертации ресурсов
│   ├── convert-fonts.js    # Конвертация шрифтов
│   ├── convert-images.js   # Конвертация изображений
│   ├── icon-fonts.js       # Создание иконочного шрифта
│   └── svg-sprite.js       # Генерация SVG-спрайтов
├── vite.config.js          # Конфигурация Vite
└── package.json
```

---

## Алиасы путей

| Алиас | Путь | Пример использования |
|-------|------|----------------------|
| `@` | `src/` | `import Header from '@/html/layout/header.html'` |
| `@js` | `src/js/` | `import { formInit } from '@js/main.js'` |
| `@styles` | `src/scss/` | `import '@/styles/utils/fonts.scss'` |
| `@html` | `src/html/` | `import template from '@html/components/button.html'` |
| `@assets` | `src/assets/` | `url('@assets/images/logo.png')` |
| `@fonts` | `src/assets/fonts/` | `url('@fonts/roboto.woff2')` |
| `@images` | `src/assets/images/` | `url('@images/hero.avif')` |
| `@icons` | `src/assets/icon-fonts/` | `url('@icons/font.woff2')` |
| `@modules` | `src/js/modules/` | `import { popup } from '@modules/popup/logic.js'` |

---

## Breakpoints (из settings.scss)

```scss
$pc: 1270px;              // Десктоп (контейнер 1270px)
$tablet: 991.98px;        // Планшет
$mobile: 767.98px;        // Мобильные устройства
$mobileSmall: 479.98px;   // Маленькие мобильные
```

**Использование в CSS/SCSS:**
```scss
@media (min-width: 768px) { ... }
@media (width < 992px) { ... }
```

---

## SCSS-миксины

### adaptiveValue
Адаптивное значение с использованием clamp():
```scss
@include adaptiveValue("font-size", 24, 16, $containerWidth, 992);
```

### gridCards
Сетка карточек:
```scss
@include gridCards(fit, 280px, 1fr, 30px);
```

### bg
Фон с поддержкой AVIF/WebP и Retina:
```scss
@include bg("@images/hero", "jpg", "@images/hero", "jpg");
```

### iconFont
Подключение иконочного шрифта:
```scss
@include iconFont();
```

### font
Подключение веб-шрифтов:
```scss
@include font("Montserrat", "montserrat-regular", "normal", 400);
```

---

## Модули JavaScript

### Доступные модули (src/js/modules/):

| Модуль | Описание |
|--------|----------|
| `burger.js` | Меню-бургер |
| `slider.js` | Слайдер на Swiper |
| `popup/` | Модальные окна с конфигурацией |
| `forms/` | Работа с формами и валидация |
| `tabs/` | Система табов |
| `spollers/` | Аккордеоны/спойлеры |
| `range/` | Ползунки (range input) |
| `scrollheader/` | Изменение хедера при скролле |
| `showmore/` | "Показать еще" функциональность |
| `marquee/` | Бегущая строка |
| `datepicker/` | Календарь/выбор даты |
| `maps/` | Интеграция карт |
| `funcs.js` | Вспомогательные функции |

### Система хуков для popup:
```javascript
document.addEventListener("formSent", (e) => {
  const target = e.detail.form.dataset.popupSuccess || "#thanks";
  setTimeout(() => {
    popup.open(target);
  }, 400);
});
```

## Модуль Slider (src/js/modules/slider.js)

**Библиотека:** Swiper 12.0.3

**Особенности реализации:**
- Адаптивная инициализация: на десктопе (≥992px) Swiper уничтожается, на мобильных создаётся
- При `destroy()` удаляется класс `swiper-initialized` для корректного пересоздания
- Использует `window.matchMedia("(min-width: 992px)")` для определения брейкпоинта

**Структура HTML для слайдера:**
```html
<div class="swiper mobile-slider">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div class="contacts__item">...</div>
    </div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

**Классы для стилизации:**
```scss
.contacts__wrapper {
  // Flex-стили для десктопа (≥768px)
  // Swiper-стили для мобильных (<768px)
}

.contacts__item {
  // width: calc(100% - 62px) для <992px (кнопки навигации частично вне слайда)
}
```

---

## Модуль Forms (src/js/modules/forms/)

**Библиотека:** iMask 7.6.1

**Data-атрибуты:**
- `[data-required="email|phone|date|card|password"]` — обязательное поле с типом валидации
- `[data-validate]` — мгновенная валидация
- `[data-ajax]` — AJAX-отправка
- `[data-quantity]` — блок с кнопками +/- для чисел
- `[data-rating]` — рейтинг со звёздами

### Конфигурация Popup (детали)

**Основные атрибуты:**
- `data-popup` - Открыть попап
- `data-close` - Закрыть попап
- `data-popup-message` - Сообщение при отправке формы
- `data-popup-success` - ID попапа для успешной отправки

**События:**
- `beforePopupOpen` - Перед открытием
- `afterPopupOpen` - После открытия
- `beforePopupClose` - Перед закрытием
- `afterPopupClose` - После закрытия

---

## Переменные SCSS (src/scss/utils/settings.scss)

```scss
$fontFamily: "Montserrat", sans-serif;
$colorBg: #302c42;         // Основной фон
$colorAccent: #c0b7e8;     // Акцентный цвет
$fontColor: #fff;          // Цвет текста
$fontSize: 16px;
$maxWidthContainer: 1270px;
$containerPadding: 30px;
```

### Полный список Breakpoints:
```scss
$pc: 1270px;              // Десктоп (контейнер 1270px)
$tablet: 991.98px;        // Планшет
$mobile: 767.98px;        // Мобильные устройства
$mobileSmall: 479.98px;   // Маленькие мобильные
```

**Использование в CSS/SCSS:**
```scss
@media (min-width: 768px) { ... }
@media (width < 992px) { ... }
```

---

## CSS-классы состояний

| Класс | Назначение |
|-------|------------|
| `._form-focus` | Активное поле формы |
| `._form-error` | Блок с ошибкой валидации |
| `._error` | Input с ошибкой |
| `._header-scroll` | Хедер при скролле |
| `._spoller-active` | Открытый спойлер |
| `._tab-active` | Активный таб |
| `._showmore-active` | Раскрытый ShowMore |

---

## Конфигурация Vite (vite.config.js)

- **Хеширование:** `isHash = true` (можно отключить)
- **HMR:** Работает для JS/SCSS, требует перезагрузки для HTML-компонентов
- **Input:** Автоматически собирает все `.html` из `src/html/pages/`

### Система плагинов:
- `vite-settings/plugins/images.js` - Конвертация изображений (AVIF/WebP)
- `vite-settings/plugins/build-tools.js` - Инструменты сборки
- `vite-settings/plugins/mpa-input.js` - Multi Page Application вход
- `vite-settings/plugins/linters.js` - Интеграция линтеров

### Алиасы путей (дополнительно):
| Алиас | Путь | Пример использования |
|-------|------|----------------------|
| `@scripts` | `scripts/` | `import converter from '@scripts/convert-images.js'` |

## Автоматическая обработка ресурсов

### Изображения:
- Автоматическая конвертация в AVIF и WebP
- Поддержка Retina (@2x)
- Watch-режим для разработки

### Шрифты:
- Конвертация TTF/OTF в WOFF2/WOFF
- Генерация @font-face миксинов
- Автоматическое подключение в CSS

### Иконки:
- SVG → Iconfont (TTF/WOFF2)
- Генерация CSS классов
- Создание SVG-спрайтов

---

## Примеры использования модулей

### Инициализация формы с валидацией:
```html
<form data-validate data-ajax data-popup-success="#thanks">
  <input type="email" data-required="email" placeholder="Email">
  <button type="submit">Отправить</button>
</form>
```

### Слайдер с адаптивностью:
```html
<div class="swiper slider">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

### Табы:
```html
<div class="tabs">
  <div class="tabs__nav">
    <button class="tabs__button _tab-active" data-tab="tab-1">Таб 1</button>
    <button class="tabs__button" data-tab="tab-2">Таб 2</button>
  </div>
  <div class="tabs__content">
    <div class="tabs__pane _tab-active" id="tab-1">Контент 1</div>
    <div class="tabs__pane" id="tab-2">Контент 2</div>
  </div>
</div>
```

## Оптимизация

### Автоматические оптимизации:
- Tree-shaking для JavaScript
- Минификация CSS/SCSS
- Сжатие изображений (AVIF/WebP)
- Хеширование для кэширования
- Lazy loading изображений

### Бандлы:
- Разделение кода по модулям
- Асинхронная загрузка компонентов
- Оптимизация критического пути рендеринга

## Важные замечания

1. **Модули SCSS** закомментированы в `src/scss/style.scss`. Раскомментируй `@import "modules/swiper";` для подключения стилей Swiper.

2. **CSS-переменная `--vh`** создаётся для корректного отображения `100vh` на мобильных устройствах.

3. **Popup-модуль** автоматически блокирует сколл body при открытии модального окна.

4. **Swiper стили** в `src/scss/modules/swiper.scss` могут конфликтовать с кастомными стилями блоков. Адаптируй через медиа-запросы.

5. **Конвертация изображений:** При запуске `npm run dev` автоматически запускается watcher, который конвертирует изображения в AVIF и WebP.

---

## Типовые задачи

### Добавить новую страницу
1. Создать `src/html/pages/pagename.html`
2. Vite автоматически подхватит её и создаст `dist/pagename.html`

### Добавить новый модуль
1. Создать `src/js/modules/newModule/config.js` и `logic.js`
2. Добавить импорт в `src/js/main.js`
3. Создать `src/scss/modules/newModule.scss` и подключить в `style.scss`

### Изменить цветовую схему
Редактировать переменные в `src/scss/utils/settings.scss`:
```scss
$colorBg: #302c42;
$colorAccent: #c0b7e8;
$fontColor: #fff;
```

### Настроить адаптивность блока
Использовать миксин `adaptiveValue`:
```scss
.block {
  @include adaptiveValue("padding", 50, 20, $containerWidth, 992);
}
```

<form action="#" method="post" class="form">

  <!-- НАТИВНЫЙ SELECT (источник истины, участвует в FormData) -->
  <select
    name="city"
    hidden
    data-custom-select
    data-required
  >
    <option value="" selected disabled>Выберите город</option>
    <option value="kuybyshev">Куйбышев</option>
    <option value="barabinsk">Барабинск</option>
    <option value="krasnogorskoe">Красногорское</option>
    <option value="celinnoe">Целинное</option>
  </select>

  <!-- КАСТОМНЫЙ SELECT -->
  <div class="custom-select">

    <!-- КНОПКА -->
    <button
      type="button"
      class="custom-select__toggle"
      data-custom-select-toggle
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span class="custom-select__value">Выберите город</span>

      <!-- КАСТОМНАЯ СТРЕЛКА -->
      <span class="custom-select__arrow" aria-hidden="true"></span>
    </button>

    <!-- ВЫПАДАЮЩИЙ СПИСОК -->
    <ul class="custom-select__list" role="listbox">
      <li
        class="custom-select__option"
        data-custom-select-option
        data-value="kuybyshev"
        role="option"
      >
        Куйбышев
      </li>

      <li
        class="custom-select__option"
        data-custom-select-option
        data-value="barabinsk"
        role="option"
      >
        Барабинск
      </li>

      <li
        class="custom-select__option"
        data-custom-select-option
        data-value="krasnogorskoe"
        role="option"
      >
        Красногорское
      </li>

      <li
        class="custom-select__option"
        data-custom-select-option
        data-value="celinnoe"
        role="option"
      >
        Целинное
      </li>
    </ul>

  </div>

  <!-- КНОПКА ОТПРАВКИ -->
  <button type="submit">Отправить</button>

</form>
