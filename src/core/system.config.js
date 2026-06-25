/**
 ** LuminaNexus ModuX System Configuration
 */
export const SYSTEM_CONFIG = {
  //~ Настройки бургер-меню и блокировки скролла
  burger: {
    menuOpenClass: "menu-open", // Класс открытого меню на теге <html>
    lockClass: "lock", // Класс блокировки скролла на теге <html>
    bodyLockDelay: 500, // Задержка блокировки в мс (под CSS-анимацию)
    paddingAttr: "[data-lp]", // Маркер фиксированных элементов для предотвращения прыжка страницы
  },

  //~ Тестовые Base64 строки для проверки форматов картинок браузером
  imageSupport: {
    webp: "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA",
    avif: "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAocGlmeAAAAAAAAAAYSWRhdGEAAAAAAAAAAwH/IAAAAAAAAAYAaWRhdAAAAAAAEBptZWRpYV90eXBlYXZpZg==",
  },

  //~ Регулярные выражения для определения мобильных платформ
  deviceDetection: {
    android: /Android/i,
    blackberry: /BlackBerry/i,
    ios: /iPhone|iPad|iPod/i,
    opera: /Opera Mini/i,
    windows: /IEMobile/i,
  },
};
