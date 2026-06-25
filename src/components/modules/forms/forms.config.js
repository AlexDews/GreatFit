/**
 ** LuminaNexus ModuX Forms Configuration (Vue Edition)
 * Центр управления поведением форм, масками и валидацией.
 */
export const formConfig = {
  //~ --- Глобальные модули (включение/выключение) ---
  viewPass: true,                // Показ/скрытие пароля в полях ввода
  autoHeight: false,             // Автовысота для элементов textarea
  formSubmitEnabled: true,       // Глобальное разрешение на отправку форм
  quantityEnabled: false,        // Включить модуль управления количеством (+/-)
  ratingEnabled: false,          // Включить модуль звездного рейтинга

  //~ --- Настройки кастомного селекта ---
  customSelectEnabled: true,     // Использовать кастомный AppSelect вместо нативного
  customSelect: {
    searchDelay: 600,            // Таймаут (мс) между нажатиями клавиш для сброса буфера поиска
  },

  //~ --- Системные идентификаторы (для глобальных событий) ---
  dataAttributes: {
    successPopup: "success-popup", // Имя попапа, вызываемого при успешной отправке
    errorPopup: "error-popup",     // Имя попапа, вызываемого при критической ошибке сервера
  },

  //~ --- CSS-классы (для интеграции с вашей версткой) ---
  classes: {
    focus: "_form-focus",         // Класс активного фокуса на инпуте или его обертке
    error: "_container-error",    // Класс ошибки для родительского контейнера поля
    errorInput: "_error",         // Класс ошибки непосредственно для тега input/textarea/select
    errorMessage: "_text-error",  // Класс для тега вывода сообщения об ошибке
    sending: "_sending",          // Класс, вешающийся на форму в процессе AJAX-отправки
    viewPass: "_viewpass-active", // Класс активного состояния кнопки показа пароля
    selectOpen: "_select-open",   // Класс открытого состояния выпадающего списка селекта
    selectActive: "_select-active", // Класс выбранного пункта (option) в списке селекта
  },

  //~ --- Локализация и тексты ошибок ---
  messages: {
    required: "Заполните поле",
    email: "Введите корректный Email",
    phone: "Номер телефона в формате: +7 (XXX) XXX-XX-XX",
    number: "Только цифры",
    password: "Минимум 8 символов (буква + цифра)",
    date: "Формат: ДД.ММ.ГГГГ",
    card: "Номер карты неверен",
    cardExpiry: "Срок действия истек",
    cardCvc: "CVC/CVV (3 цифры)",
    checkbox: "Нужно согласие на обработку персональных данных",
    select: "Пожалуйста, выберите город",
    name: "Введите имя",
  },

  //~ --- Регулярные выражения для валидации ---
  validation: {
    email: { pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/ },
    password: { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }, 
    date: { pattern: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/ },
  },

  //~ --- Конфигурация масок iMask ---
  imask: {
    enabled: true,                // Включить глобальную поддержку масок (через v-imask)
    phone: { 
      enabled: true, 
      mask: "+{7} (000) 000-00-00", 
      lazy: true 
    },
    date: {
      enabled: true,
      pattern: "DD.MM.YYYY",
      minDateOffset: 0,           // Смещение минимальной даты (в днях) относительно сегодня
      blocks: {
        DD: { from: 1, to: 31 },
        MM: { from: 1, to: 12 },
        YYYY: { from: 1900, to: 2100 },
      },
      lazy: false,                // Показывать маску-подсказку (ДД.ММ.ГГГГ) сразу при фокусе
    },
    card: {
      enabled: true,
      mask: "0000 0000 0000 0000",
      lazy: true,
      allowedCards: { visa: true, mastercard: true, mir: true },
    },
    cardExpiry: { enabled: true, mask: "00/00", lazy: false },
    cardCvc: { enabled: true, mask: "000", lazy: false },
  },

  //~ --- Безопасность и фильтрация файлов ---
  security: {
    enableSanitization: true,     // Включить автоматическую XSS-санитизацию строк
    sanitizationLevel: "standard", // Уровень строгости очистки (basic, standard, strict)
    maxFileSize: 10485760,         // Максимальный размер загружаемого файла (10MB в байтах)
    xssPatterns: [],              // Кастомные RegExp для XSS (если пусто — берутся дефолтные из кода)
    allowedFileTypes: [           // Разрешенные MIME-типы для валидатора файлов
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
};