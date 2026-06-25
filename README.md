# Lumina Nexus

> **Modular UX Engine** — Высокопроизводительная экосистема для фронтенд-разработки на базе Vite.

## Содержание
- [Стек](#стек)
- [Модули](#модули)
  - [Slider](#slider)
  - [Datepicker](#datepicker)
  - [Forms](#forms)
  - [Popup](#popup)
  - [Range](#range)
  - [Marquee](#marquee)
  - [Maps](#maps)
  - [ScrollHeader](#scrollheader)
  - [ShowMore](#showmore)
  - [Spollers](#spollers)
  - [Tabs](#tabs)
  - [Как добавить модуль](#как-добавить-модуль)
- [Установка](#установка)
- [Структура](#структура)
- [Плагины Vite](#плагины-vite)
  - [Изображения](#изображения-imagesjs)
  - [Сборка](#сборка-build-toolsjs)
  - [MPA](#mpa-mpa-inputjs)
  - [Линтеры](#линтеры-lintersjs)
- [Конфигурация](#конфигурация-viteconfigjs)
- [Алиасы](#алиасы)
- [HMR](#hmr)
- [SCSS](#scss)
- [Build (production)](#build-production)
  - [Сборка](#сборка)
  - [Плагины при сборке](#плагины-при-сборке)
  - [PostCSS](#postcss)
  - [Browserslist](#browserslist)
  - [Зависимости в сборке](#зависимости-в-сборке)
- [Скрипты](#скрипты)
- [Лицензия](#лицензия)

## Стек

- **Vite** — сборка и dev-сервер
- **JavaScript (ES6+)** — основной язык
- **SCSS** — стилизация
- **ESLint / Stylelint** — линтинг
- **Husky** — git hooks

## Модули

### Slider

[Настройки](./src/js/modules/slider.js)

**Библиотека:** Swiper 12.0.3

**Селектор:** `.swiper`

**Настройки:**

| Параметр         | Значение | Описание                         |
|------------------|----------|----------------------------------|
| `slidesPerView`  | 1        | Количество слайдов               |
| `spaceBetween`   | 20       | Отступ между слайдами            |
| `autoHeight`     | true     | Автовысота                       |
| `speed`          | 800      | Длительность перехода            |
| `watchOverflow`  | true     | Отключить при недостатке слайдов |

**Модули Swiper:**

| Модуль           | Назначение                        |
|------------------|-----------------------------------|
| `Navigation`     | Кнопки навигации                  |
| `Pagination`     | Булиты, номера, прогресс-бар      |
| `Autoplay`       | Автопрокрутка                     |
| `FreeMode`       | Свободный скролл                  |
| `Mousewheel`     | Управление колёсиком              |
| `EffectFade`     | Плавное появление                 |
| `EffectCoverflow`| 3D-карусель                       |

**Брейкпоинты:**

```javascript
breakpoints: {
  768: {slidesPerView: 2, spaceBetween: 20},
  1024: {slidesPerView: 3, spaceBetween: 30},
}
```

**HTML:**

```html
<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div class="swiper-slide__content">
         <img src="@images/slide-01.webp" alt="Slide 1" loading="lazy">
      </div>
      <div class="swiper-lazy-preloader"></div>
    </div>
    <div class="swiper-slide">
      <div class="swiper-slide__content">
         <img src="@images/slide-02.webp" alt="Slide 2" loading="lazy">
      </div>
      <div class="swiper-lazy-preloader"></div>
    </div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-scrollbar"></div>
</div>
```

---

[↑](#содержание)

### Datepicker

[Настройки](./src/js/modules/datepicker/config.js)

**Селектор:** `.datepicker-input`

**Настройки:**

| Параметр          | Значение      | Описание                     |
|-------------------|---------------|------------------------------|
| `minDate`         | 2020-01-01    | Минимальная дата             |
| `maxDate`         | 2030-12-31    | Максимальная дата            |
| `showNavButtons`  | true          | Кнопки навигации             |
| `useInternalMask` | true          | Маска ввода                  |
| `showPrevMonths`  | true          | Дни предыдущего месяца       |
| `showNextMonths`  | true          | Дни следующего месяца        |
| `enabledDays`     | []            | Разрешённые дни недели       |

**Классы:**

| Класс                    | Назначение                                   | Тип                 |
|--------------------------|----------------------------------------------|---------------------|
| `.datepicker-wrapper`    | Главная обертка всего модуля                 | Обязательный (HTML) |
| `.datepicker-input`      | Поле ввода (куда пишется дата)               | Обязательный (HTML) |
| `.datepicker-container`  | Оболочка самого календаря                    | Обязательный (HTML) |
| `.is-active`             | "Добавляется контейнеру, когда он открыт"    | Состояние (JS)      |
| `.has-error`             | Добавляется инпуту при неверной дате         | Состояние (JS)      |
| `.dp-header`             | Контейнер для навигации (шапка)              | Структурный (JS)    |
| `.dp-prev`               | Кнопка «Назад» (предыдущий месяц)            | Кнопка (JS)         |
| `.dp-next`               | Кнопка «Вперёд» (следующий месяц)            | Кнопка (JS)         |
| `.dp-title-selects`      | Обертка для селектов месяца и года           | Структурный (JS)    |
| `.dp-month-select`       | Выпадающий список месяцев                    | Элемент (JS)        |
| `.dp-year-select`        | Выпадающий список годов                      | Элемент (JS)        |
| `.dp-grid`               | Сетка с днями недели и числами               | Структурный (JS)    |
| `.dp-weekday`            | "Заголовки дней недели (Пн, Вт...)"          | Элемент (JS)        |
| `.dp-day`                | Общий класс для каждой ячейки числа          | Элемент (JS)        |
| `.dp-day-selected`       | Текущая выбранная дата                       | Состояние (JS)      |
| `.dp-day-disabled`       | Неактивные дни (вне лимита дат)              | Состояние (JS)      |
| `.is-adj`                | Дни соседних месяцев (для заполнения сетки)  | Состояние (JS)      |

**Локализация:**

```javascript
monthNames: ["Январь", "Февраль", ...]
weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
```

**HTML:**

```html
<div class="datepicker-wrapper">
  <div class="input-group">
    <input type="text" class="datepicker-input" placeholder="ДД.ММ.ГГГГ">
    <span class="input-group__icon">📅</span>
  </div>
  <div class="datepicker-container"></div>
</div>
```

---

[↑](#содержание)

### Forms

[Настройки](./src/js/modules/forms/config.js)

**Библиотека:** IMask 7.6.1

**Data-атрибуты:**

| Атрибут                       | Назначение                    |
|-------------------------------|-------------------------------|
| `[data-required="email"]`     | Обязательное поле email       |
| `[data-required="phone"]`     | Обязательное поле phone       |
| `[data-required="password"]`  | Обязательное поле password    |
| `[data-required="date"]`      | Обязательное поле date        |
| `[data-required="card"]`      | Обязательное поле card        |
| `[data-validate]`             | Мгновенная валидация          |
| `[data-autoheight]`           | Автовысота textarea           |
| `[data-no-validate]`          | Отключить валидацию           |
| `[data-goto-error]`           | Скролл к ошибке               |
| `[data-popup-message="id"]`   | Попап после отправки          |
| `[data-ajax]`                 | Ajax-отправка                 |
| `[data-dev]`                  | Режим разработки              |
| `[data-rating]`               | Блок звёзд                    |
| `[data-quantity]`             | Блок +/-                      |
| `[data-quantity-plus]`        | Увеличивает значение на 1     |
| `[data-quantity-minus]`       | Уменьшает значение на 1       |
| `[data-quantity-value]`       | Поле ввода (input)            |
| `[data-quantity-min]`         | Минимальное число 1           |                      
| `[data-quantity-max]`         | Максимальное число 20         |
| `[data-autoheight-max]`       | Ограничение высоты textarea   |                  

**Классы:**

| Класс              | Назначение         |
|--------------------|--------------------|
| `._form-focus`     | Активное поле      |
| `._form-error`     | Блок с ошибкой     |
| `._error`          | Input с ошибкой    |
| `form__error`      | Текст ошибки       |
| `._sending`        | Отправка           |
| `._viewpass-active`| Показать пароль    |

**Валидация:**

| Тип       | Паттерн                                           |
|-----------|---------------------------------------------------|
| `email`   | `\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$`      |
| `phone`   | `+7XXXXXXXXXX`                                    |
| `password`| `(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}`            |
| `date`    | `DD.MM.YYYY`                                      |
| `card`    | `16 цифр`                                         |

**Маски IMask:**

| Тип          | Маска                        |
|--------------|------------------------------|
| `phone`      | `+7 (000) 000-00-00`         |
| `date`       | `DD.MM.YYYY`                 |
| `card`       | `0000 0000 0000 0000`        |
| `cardExpiry` | `00/00`                      |
| `cardCvc`    | `000`                        |

**HTML:**

```html
<form action="/api/send" method="POST" data-ajax data-goto-error data-popup-message="#success-popup">
  
  <div class="form__group">
    <label>Email</label>
    <input type="email" name="email" data-required="email" data-validate placeholder="email@mail.ru">
  </div>

  <div class="form__group">
    <label>Телефон</label>
    <input type="tel" name="phone" data-required="phone" placeholder="+7 (___) ___-__-__">
  </div>

  <div class="form__group">
    <label>Дата визита</label>
    <input type="text" name="date" data-required="date" placeholder="ДД.ММ.ГГГГ">
  </div>

  <div class="form__group">
    <label>Пароль</label>
    <div class="form__input-wrapper">
      <input type="password" name="pass" data-required="password">
      <button type="button" class="form__viewpass">Переключить</button>
    </div>
  </div>

  <div class="form__group" data-quantity>
    <button type="button" data-quantity-minus>-</button>
    <input type="number" name="count" data-quantity-value value="1" data-quantity-min="1" data-quantity-max="10">
    <button type="button" data-quantity-plus>+</button>
  </div>

  <div class="rating rating_set" data-rating>
    <div class="rating__body">
      <div class="rating__active"></div> <div class="rating__items">
        <input type="radio" class="rating__item" value="1" name="rating">
        <input type="radio" class="rating__item" value="2" name="rating">
        <input type="radio" class="rating__item" value="3" name="rating">
        <input type="radio" class="rating__item" value="4" name="rating">
        <input type="radio" class="rating__item" value="5" name="rating">
      </div>
    </div>
    <div class="rating__value" data-rating-value>4.0</div>
  </div>

  <button type="submit" class="form__button">Отправить данные</button>
</form>
```

---

[↑](#содержание)

### Popup

[Настройки](./src/js/modules/popup/config.js)

**Селектор:** `.popup`

**Data-атрибуты:**

| Атрибут                    | Назначение                       |
|----------------------------|----------------------------------|
| `[data-popup="#id .class"]`| Кнопка открытия                  |
| `[data-close]`             | Кнопка закрытия                  |
| `[data-lp]`                | Фиксированные элементы           |
| `[data-popup-message]`     | Кнопка для вызова системных окон |

**Настройки:**

| Параметр                | Значение | Описание                 |
|-------------------------|----------|--------------------------|
| `focusCatch`            | true     | Захват фокуса            |
| `closeEsc`              | true     | Закрытие по Escape       |
| `bodyLock`              | true     | Блокировка скролла       |
| `hashSettings.location` | true     | URL hash                 |
| `hashSettings.goHash`   | true     | Открытие по hash         |

**Классы:**

| Класс                | Назначение                    |
|----------------------|-------------------------------|
| `.popup`             | Основной класс                |
| `.popup__wrapper`    | Внешняя оболочка контента     |
| `.popup__content`    | Контент                       |
| `.popup_show`        | Открытый попап                |
| `html.popup-show`    | Body при открытом попапе      |

**Callbacks:**

| Событие      | Описание                     |
|--------------|------------------------------|
| `beforeOpen` | Перед открытием              |
| `afterOpen`  | После открытия               |
| `beforeClose`| Перед закрытием              |
| `afterClose` | После закрытия               |

**HTML:**

```html
<header data-lp class="header">...</header>

<button data-popup="#my-popup">Открыть по ID</button>
<button data-popup=".my-popup-class">Открыть по классу</button>

<div class="popup" id="my-popup" aria-hidden="true">
  <div class="popup__wrapper">
    <div class="popup__content">
      <button data-close class="popup__close">Закрыть</button>
      </div>
  </div>
</div>
```

---

[↑](#содержание)

### Range

[Настройки](./src/js/modules/range/config.js)

[Документация](https://refreshless.com/nouislider/)

**Особенности реализации в ModuX**

1. Форматирование: Модуль автоматически добавляет пробелы (разделитель тысяч) при выводе в инпуты.

2. Двусторонняя связь: При изменении числа в инпуте вручную (и нажатии Enter/потере фокуса),
слайдер автоматически передвинет ручку в указанную позицию.

3. Безопасность: Если в инпут ввести текст или спецсимволы,
функция from в конфиге очистит значение до чистого числа.

**Библиотека:** noUiSlider 15.8.1

**Селекторы:** 
| Параметр       | Описание                             |
|----------------|--------------------------------------|
| `#range`       | Место отрисовки слайдера.            |                      
| `#price-start` | Текстовое поле для левого ползунка.  |                      
| `#price-end`   | Текстовое поле для правого ползунка. |                      

**Настройки:**

| Параметр     | Значение       | Описание                |
|--------------|----------------|-------------------------|
| `start`      | [0, 200000]    | Начальные позиции       |
| `connect`    | true           | Закрашивать область     |
| `step`       | 100            | Шаг                     |
| `range.min`  | 0              | Минимум                 |
| `range.max`  | 200000         | Максимум                |
| `inputs.min` | #price-start   | Input минимума          |
| `inputs.max` | #price-end     | Input максимума         |
| `format.to`  | toLocaleString | Function                |

**HTML:**

```html
<div class="price-inputs">
  <div class="price-inputs__field">
    <label for="price-start">От:</label>
    <input type="text" id="price-start" autocomplete="off">
  </div>
  <div class="price-inputs__field">
    <label for="price-end">До:</label>
    <input type="text" id="price-end" autocomplete="off">
  </div>
</div>

<div id="range"></div>
```

---

[↑](#содержание)

### Marquee

[Настройки](./src/js/modules/marquee/config.js)

**Особенности реализации в ModuX**

1. Динамический Resize: При изменении ширины окна (например, поворот планшета),
ModuX автоматически пересчитает ширину списка и обновит скорость анимации.

2. Производительность: Скрипт использует requestAnimationFrame для оптимизации пересчета при ресайзе.

**Селектор:** 
|Класс / Селектор          | Описание                                          | Обязателен |
|--------------------------|---------------------------------------------------|------------|
|`.first`                  | Основной контейнер (указывается в config.js).     | Да         |
|`.first__run-line`        | Обертка, которая непосредственно движется.        | Да         |
|`.first__list--original`  | Список-эталон, по нему JS вычисляет ширину сдвига.| Да         |
|`.first__list--duplicate` | Копия списка для создания эффекта бесконечности.  | Да         |

**Настройки:**

| Параметр       | Значение | Описание                |
|----------------|----------|-------------------------|
| `selector`     | `.first` | Блок бегущей строки     |
| `baseDuration` | 10       | Скорость (секунды)      |

**Data-атрибуты:**

| Атрибут                | Назначение           |
|------------------------|----------------------|
| `[data-marquee-pause]` | Пауза при ховере     |

**HTML:**

```html
<div class="marquee first" data-marquee-pause>
  <div class="first__run-line">
    <ul class="first__list first__list--original">
      <li>Элемент 1</li>
      <li>Элемент 2</li>
      <li>Элемент 3</li>
    </ul>
    <ul class="first__list first__list--duplicate" aria-hidden="true">
      <li>Элемент 1</li>
      <li>Элемент 2</li>
      <li>Элемент 3</li>
    </ul>
  </div>
</div> 
```

---

[↑](#содержание)

### Maps

**Поддержка:** Google Maps / Яндекс.Карты

**Настройки:**

| Параметр            | Значение  | Описание                |
|---------------------|-----------|-------------------------|
| `type`              | `yandex`  | Тип карты               |
| `apiKey`            | string    | API-ключ                |
| `center`            | [lat, lng]| Центр карты             |
| `zoom`              | 14        | Зум                     |
| `disableBehaviors`  | true      | Отключить поведение     |

**Маркеры:**

| Параметр    | Описание                    |
|-------------|-----------------------------|
| `coords`    | [lat, lng]                  |
| `icon`      | Путь к иконке               |
| `size`      | [width, height]             |
| `offset`    | [x, y]                      |
| `balloon`   | Текст балуна                |

**HTML:**

```html
<div class="map" id="map"></div>
```

---

[↑](#содержание)

### ScrollHeader

[Настройки](./src/js/modules/scrollheader/config.js)

**Особенности реализации в ModuX:**

1. Автоматическое закрытие меню: Если у тебя открыто мобильное меню (есть класс menu-open),
функция goToBlock автоматически вызовет menuClose() из твоих функций.

2. Замер высоты хедера: Модуль динамически замеряет высоту header даже если он скрыт или имеет transition.
Это исключает «наползание» шапки на заголовок секции.

3. Ease-функция: Используется квадратичный easing для естественного ускорения и замедления прокрутки.

4. Кастомные события: Модуль генерирует событие windowScroll,
к которому можно подцепить другие функции (например, анимацию появления элементов).

**Селектор:** `header.header`

**Data-атрибуты:**

| Атрибут                    | Назначение            | Значение        |
|----------------------------|-----------------------|-----------------|
| `[data-goto]`              | Ссылка на блок        | .selector / #id |
| `[data-goto-speed]`        | Скорость прокрутки    | ms              |
| `[data-goto-offset]`       | Отступ                | px              |
| `[data-goto-no-header]`    | Без учёта хедера      |                 |
| `[data-scroll-show]`       | Включить умный хедер  |                 |
| `[data-scroll]`            | Точка активации       |                 |

**Настройки:**

| Параметр              | Значение | Описание                |
|-----------------------|----------|-------------------------|
| `header.startPoint`   | 50       | px для скролл-класса    |
| `header.show`         | true     | Умное скрытие           |
| `header.showTimer`    | 500      | Задержка появления      |
| `goto.offsetTop`      | 0        | Отступ сверху           |
| `goto.speed`          | 1000     | Скорость                |

**Классы:**

| Класс               | Назначение                    |
|---------------------|-------------------------------|
| `._header-scroll`   | Скролл ниже startPoint        |
| `._header-show`     | Показывать при скролле вверх  |

**HTML:**

```html
<header class="header">
  <nav class="header__menu">
    <a href="#about" data-goto="#about">О нас</a>
    
    <a href="#contacts" data-goto="#contacts" data-goto-speed="2000">Контакты (медленно)</a>
    
    <a href="#footer" data-goto="#footer" data-goto-no-header>В самый низ</a>
  </nav>
</header>

<section id="about" style="margin-top: 100vh;">
  <h2>О нас</h2>
</section>

<section id="contacts" style="margin-top: 100vh;">
  <h2>Контакты</h2>
</section>
```

---

[↑](#содержание)

### ShowMore

[Настройки](./src/js/modules/showmore/config.js)

**Особенности реализации в ModuX:**

1. Умный расчет высоты: Если ты используешь режим items,
скрипт сам просуммирует высоту первых N элементов, чтобы точно знать, где сделать отсечку.

2. Slide-эффект: Используются вспомогательные функции _slideUp и _slideDown
для плавного изменения высоты без использования max-height.

3. Resize-адаптация: При изменении размера окна скрипт пересчитывает высоту оригинального контента,
чтобы анимация всегда была точной.

**Селектор:** `[data-showmore]`

**Data-атрибуты:**

| Атрибут                          | Назначение                    |
|----------------------------------|-------------------------------|
| `[data-showmore]`                | Контейнер                     |
| `[data-showmore="size"]`         | По высоте (px)                |
| `[data-showmore="items"]`        | По количеству                 |
| `[data-showmore-content="200"]`  | Высота/количество             |
| `[data-showmore-button="300"]`   | Скорость анимации             |
| `[data-showmore-media="768,min"]`| Медиа-запрос                  |

**Настройки:**

| Параметр       | Значение           | Описание            |
|----------------|--------------------|---------------------|
| `speed`        | 500                | Скорость анимации   |
| `activeClass`  | `_showmore-active` | Активный класс      |
| `initClass`    | `_showmore-init`   | Класс инициализации |

**HTML:**

```html
<div data-showmore="size" data-showmore-speed="800">
  <div data-showmore-content="200">
    <p>Контент будет обрезан на высоте 200px...</p>
  </div>
  <button data-showmore-button type="button">
    <span>Показать еще</span>
    <span>Скрыть</span>
  </button>
</div>

<div data-showmore="items">
  <div data-showmore-content="3">
    <div>Карточка 1</div>
    <div>Карточка 2</div>
    <div>Карточка 3</div>
    <div>Карточка 4</div> </div>
  <button data-showmore-button type="button">Показать всё</button>
</div>
```

---

[↑](#содержание)

### Spollers

[Настройки](./src/js/modules/spollers/config.js)

**Особенности реализации в ModuX**

1. Адаптивность: Ты можешь прописать data-spollers="992,max",
и на десктопе это будет просто обычный список (заголовки + текст),
а на планшетах и телефонах он превратится в интерактивный аккордеон.

2. События анимации: Используются те же вспомогательные функции _slideUp / _slideDown,
что и в ShowMore, что гарантирует плавность и отсутствие конфликтов.

3. Доступность: Модуль автоматически управляет атрибутами для кнопок, делая интерфейс понятнее.

**Селектор:** `[data-spollers]`

**Data-атрибуты:**

| Атрибут                    | Назначение                    |
|----------------------------|-------------------------------|
| `[data-spollers]`          | Родитель                      |
| `[data-spollers="768,max"]`| Медиа-точка                   |
| `[data-one-spoller]`       | Аккордеон                     |
| `[data-spollers-speed]`    | Скорость                      |
| `[data-spoller]`           | Кнопка                        |
| `[data-spoller-close]`     | Закрытие вне                  |

**Настройки:**

| Параметр       | Значение          | Описание        |
|----------------|-------------------|-----------------|
| `speed`        | 500               | Скорость        |
| `initClass`    | `_spoller-init`   | Инициализация   |
| `activeClass`  | `_spoller-active` | Активный        |

**HTML:**

```html
<div data-spollers data-one-spoller class="spollers-block">
  
  <div class="spollers-block__item">
    <button type="button" data-spoller class="spollers-block__title">Заголовок 1</button>
    <div class="spollers-block__body">Контент первого спойлера...</div>
  </div>

  <div class="spollers-block__item">
    <button type="button" data-spoller class="spollers-block__title">Заголовок 2</button>
    <div class="spollers-block__body">Контент второго спойлера...</div>
  </div>

</div>

<!-- Аккордеон -->
<div data-spollers data-one-spoller>...</div>

<!-- Мобильные спойлеры -->
<div data-spollers="768,max">...</div>
```

---

[↑](#содержание)

### Tabs

[Настройки](./src/js/modules/tabs/config.js)

**Особенности реализации в ModuX**

1. Безопасная вложенность: Скрипт использует метод .closest(),
поэтому ты можешь вставлять табы внутрь других табов — они не будут конфликтовать.

2. SEO & Accessability: Неактивные табы получают атрибут hidden,
что корректно обрабатывается экранными дикторами.

3. Hash-навигация: Идеально для ссылок извне — можно отправить пользователю ссылку,
которая сразу откроет нужную вкладку в середине страницы.

**Селектор:** `[data-tabs]`

| Класс          | Назначение                                            |
|----------------|-------------------------------------------------------|
| `._tab-init`   | Добавляется контейнеру при готовности скрипта.        |
| `._tab-active` | Указывает на текущую активную кнопку и блок контента. |
| `._tab-spoller`| Автоматически вешается на контейнер, когда табы.      |

**Data-атрибуты:**

| Атрибут                  | Назначение                    |
|--------------------------|-------------------------------|
| `[data-tabs]`            | Контейнер                     |
| `[data-tabs="992,max"]`  | Медиа-точка                   |
| `[data-tabs-titles]`     | Контейнер кнопок              |
| `[data-tabs-title]`      | Кнопка таба                   |
| `[data-tabs-body]`       | Контейнер контента            |
| `[data-tabs-item]`       | Блок контента                 |
| `[data-tabs-hash]`       | Запись в URL                  |
| `[data-tabs-animate]`    | Анимация высоты               |

**Настройки:**

| Параметр        | Значение        | Описание                |
|-----------------|-----------------|-------------------------|
| `speed`         | 500             | Скорость                |
| `initClass`     | `_tab-init`     | Инициализация           |
| `activeClass`   | `_tab-active`   | Активный                |
| `spollerClass`  | `_tab-spoller`  | Мобильный вид           |

**HTML:**

```html
<div data-tabs class="tabs">
  <nav data-tabs-titles class="tabs__navigation">
    <button type="button" class="tabs__title _tab-active">Вкладка 1</button>
    <button type="button" class="tabs__title">Вкладка 2</button>
  </nav>

  <div data-tabs-body class="tabs__content">
    <div data-tabs-item class="tabs__section">
      Контент первой вкладки...
    </div>
    <div data-tabs-item class="tabs__section">
      Контент второй вкладки...
    </div>
  </div>
</div>

<!-- С анимацией -->
<div data-tabs data-tabs-animate="500">...</div>

<!-- С хешем -->
<div data-tabs data-tabs-hash>...</div>
```

[↑](#содержание)

### Как добавить модуль

1. Создать `src/js/modules/newModule/`
2. Добавить `config.js` и `logic.js`
3. Подключить в `main.js`:
4. Стили: Создай `src/scss/modules/_имя_модуля.scss` и подключи его в `main.scss`

```javascript
import './modules/newModule/logic.js'
```

[↑](#содержание)

## Установка

```bash
npm install          # зависимости
npm run dev          # dev-сервер
npm run build        # production сборка
npm run preview      # preview сборки
npm run lint         # линтинг
npm run style        # линтинг стилей
```

[↑](#содержание)

## Структура

```
ModuX/
├── public/              # статика
├── src/
│   ├── assets/          # fonts/, icons/, images/
│   ├── html/
│   │   ├── layout/      # header.html, footer.html
│   │   └── pages/       # страницы .html
│   ├── js/
│   │   ├── main.js      # точка входа
│   │   └── modules/     # модули (config + logic)
│   ├── scss/
│   │   ├── base/        # datepicker, formrange, swiper
│   │   ├── components/  # компоненты
│   │   └── utils/       # mixins, settings, fonts
│   └── index.html
├── scripts/             # конвертация шрифтов, иконок, изображений
├── vite.config.js
├── vite-settings/       # плагины, алиасы
└── package.json
```

[↑](#содержание)

## Плагины Vite

Находятся в `vite-settings/plugins/`:

### Изображения (`images.js`)

| Плагин                  | Что делает                              |
|-------------------------|-----------------------------------------|
| `ViteImageOptimizer`    | Оптимизация: PNG 80%, остальные 75%     |
| `html-transform-images` | Добавляет `<source avif/webp>` к `<img>`|

### Сборка (`build-tools.js`)

| Плагин      | Назначение                                     |
|-------------|------------------------------------------------|
| `handlebars`| Партиалы из `html/components/`, `html/layout/` |
| `purgecss`  | Удаляет неиспользуемые стили                   |
| `pwa`       | Progressive Web App                            |
| `zip-pack`  | Архив `dist/archive.zip`                       |

### MPA (`mpa-input.js`)

Автоматически находит все `.html` в `src/html/pages/`:

```
about.html           → /about
blog/post.html       → /blog-post
```

Вывод в корень `dist/`:

```
assets/js/[name].min.[hash].js
assets/css/[name].min.[hash].css
```

### Линтеры (`linters.js`)

| Плагин      | Файлы                    | Автоисправление  |
|-------------|--------------------------|------------------|
| `eslint2`   | `src/**/*.js`            | есть             |
| `stylelint` | `src/**/*.{scss,css}`    | есть             |

[↑](#содержание)

## Конфигурация (`vite.config.js`)

```javascript
export default defineConfig({
  root: srcDir,
  server: {
    open: true,
    watch: {
      usePolling: true,
      additionalPaths: ["src/html/components"],
    },
  },
  resolve: { alias: aliases },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use "..." as *;`,
      },
    },
  },
  plugins: [createVitePlugins(srcDir, isHash)],
});
```

[↑](#содержание)

## Алиасы

```javascript
// @ → src/
// @js → src/js/
// @styles → src/scss/
// @html → src/html/
// @assets → src/assets/
// @fonts → src/assets/fonts/
// @images → src/assets/images/
// @icons → src/assets/icon-fonts/
// @modules → src/js/modules/
```

```javascript
import Header from '@/html/layout/header.html'
import { formInit } from '@/modules/forms/logic.js'
import '@/styles/utils/fonts.scss'
```

[↑](#содержание)

## HMR

| Изменение        | Поведение            |
|------------------|----------------------|
| JS / SCSS        | Горячая замена       |
| HTML компоненты  | Перезагрузка страницы|
| Страницы         | Перезапуск Vite      |

[↑](#содержание)

## SCSS

В каждый SCSS-файл автоматически подключаются:

```scss
@use "src/scss/utils/settings" as *;  // переменные
@use "src/scss/utils/mixins" as *;    // миксины
```

### Структура SCSS

```
scss/
├── style.scss              # Главный файл (точка входа)
├── utils/
│   ├── null.scss           # Reset CSS (сброс стилей)
│   ├── base.scss           # Базовые стили (html, body, контейнеры)
│   ├── fonts.scss          # Подключение шрифтов (@font-face)
│   ├── icon-fonts.scss     # Иконковый шрифт
│   ├── settings.scss       # Переменные (цвета, шрифты, breakpoints)
│   └── mixins.scss         # Миксины (media-запросы, адаптивность)
├── components/
│   └── start.scss          # Стартовые компоненты (btn, input, и т.д.)
└── modules/
    ├── datepicker.scss     # Стили календаря
    ├── forms.scss          # Стили форм
    ├── marquee.scss        # Стили бегущей строки
    ├── popup.scss          # Стили попапов
    ├── range.scss          # Стили слайдеров
    ├── scrollheader.scss   # Стили умного хедера
    ├── showmore.scss       # Стили "показать ещё"
    ├── spollers.scss       # Стили спойлеров
    ├── swiper.scss         # Стили слайдеров Swiper
    └── tabs.scss           # Стили табов
```

### Подключение модулей

Модули закомментированы в `style.scss`. Раскомментируй нужные:

```scss
@use "modules/datepicker";
@use "modules/range";
@use "modules/forms";
@use "modules/swiper";
@use "components/start";
```

### Основные переменные

```scss
$fontFamily: "Имя шрифта", sans-serif;
$fontSize: 16px;
$colorBg: #ffffff;
$colorText: #000000;
$colorPrimary: #007bff;
$colorAccent: #ffc107;

// Breakpoints
$minWidth: 320px;
$maxWidth: 1920px;
$maxWidthContainer: 1400px;
$containerPadding: 20px;
$responsive: 768; // Mobile First
```

### Основные миксины

```scss
@include font-face("Name", "../fonts/Name", 400, normal, "woff2");
@include adaptiveValue("font-size", 16, 12);     // Адаптивный font-size
@include adaptiveValue("padding", 20, 10);       // Адаптивный padding
@include respond-to("tablet") { ... }            // Media-запрос
@include respond-to("desktop", "max") { ... }    // Desktop и меньше
@include scrollbar(10px, #ccc, #999);        // Кастомный скроллбар
```

[↑](#содержание)

## Build (production)

```bash
npm run build    # ресурсы + сборка
npm run preview  # preview собранного
```

### Сборка

| Параметр        | Значение     |
|-----------------|--------------|
| `outDir`        | `dist/`      |
| `emptyOutDir`   | true         |
| `rollupOptions` | по умолчанию |

### Плагины при сборке

| Плагин                  | Действие                       |
|-------------------------|--------------------------------|
| `ViteImageOptimizer`    | PNG 80%, остальные 75%         |
| `html-transform-images` | Добавляет `<source avif/webp>` |
| `handlebars`            | Собирает страницы из `pages/`  |
| `purgecss`              | Удаляет неиспользуемые стили   |
| `pwa`                   | Генерирует service worker      |
| `zip-pack`              | Создаёт `dist/archive.zip`     |

### PostCSS

| Плагин                       | Назначение                   |
|------------------------------|------------------------------|
| `autoprefixer`               | Добавляет вендорные префиксы |
| `postcss-pxtorem`            | px → rem                     |
| `postcss-sort-media-queries` | Сортировка media-запросов    |

### Browserslist

```
last 2 versions
not dead
> 0.2%
```

### Зависимости в сборке

| Библиотека   | Версия  | Назначение  |
|--------------|---------|-------------|
| `IMask`      | ^7.6.1  | Маски ввода |
| `noUiSlider` | ^15.8.1 | Слайдеры    |
| `Swiper`     | ^12.0.3 | Карусели    |

## Скрипты

| Команда          | Файл                       | Что делает              |
|------------------|----------------------------|-------------------------|
| `npm run fonts`  | `scripts/convert-fonts.js` | Шрифты → WOFF2          |
| `npm run icons`  | `scripts/icon-fonts.js`    | SVG → иконковый шрифт   |
| `npm run img`    | `scripts/convert-images.js`| Изображения → AVIF/WEBP |
| `npm run sprite` | `scripts/svg-sprite.js`    | SVG → спрайт            |
| `npm run assets` | —                          | все ресурсы сразу       |

[↑](#содержание)

## Лицензия

MIT
