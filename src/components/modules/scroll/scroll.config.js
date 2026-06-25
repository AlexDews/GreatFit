/**
 ** LuminaNexus ModuX Scroll & Header Configuration
 * Все настройки плавного скролла и динамического поведения шапки сайта.
 */
export const SCROLL_CONFIG = {
  //~ Настройки плавной прокрутки к блокам
  goto: {
    offsetTop: 0,      // Дополнительный отступ сверху (px)
    speed: 1000,       // Скорость анимации скролла в мс
    noHeader: false,   // Игнорировать ли шапку по умолчанию (вычитать ли её высоту)
  },
  
  //~ Настройки динамической шапки
  header: {
    startPoint: 50,    // Через сколько px скролла добавлять класс фиксированной шапки
    show: true,        // Скрывать шапку при скролле вниз / показывать при скролле вверх
    showTimer: 500,    // Задержка автоматического появления шапки при остановке скролла (ms)
  },
  
  //~ CSS Селекторы и классы
  selectors: {
    // Основной селектор шапки сайта для отслеживания её состояния и высоты
    header: "header.header",

    // Класс, который добавляется к шапке, когда пользователь прокрутил страницу ниже startPoint
    scrollClass: "_header-scroll",

    // Класс, который управляет видимости шапки при "умном скролле" (вверх — показать, вниз — скрыть)
    showClass: "_header-show",

    // Системный класс на теге html при открытом бургер-меню (чтобы авто-закрывать его при скролле)
    menuOpenClass: "menu-open", 
  },
  
  //~ HTML Атрибуты (Data-attributes) для декларативного использования в шаблонах
  attributes: {
    goto: "data-goto",              // Основной селектор цели (например: data-goto="#contacts")
    gotoSpeed: "data-goto-speed",    // Кастомная скорость из HTML
    gotoOffset: "data-goto-offset",  // Кастомный отступ из HTML
    gotoNoHeader: "data-goto-no-header", // Флаг игнорирования шапки из HTML

    headerNoShow: "data-scroll-show", // Вкл/выкл умное появление хедера через HTML
    headerShowTimer: "data-scroll-show-timer", // Кастомный таймер из HTML
    headerScrollPoint: "data-scroll", // Кастомная точка активации из HTML
  }
};