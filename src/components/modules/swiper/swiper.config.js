/**
 ** LuminaNexus ModuX Swiper Configuration
 */
export const SWIPER_CONFIG = {
  //~ Настройки слайдера по умолчанию
  defaults: {
    loop: true,                  // Бесконечное зацикливание слайдов
    speed: 500,                  // Скорость переключения (мс)
    slidesPerView: 1,            // Количество видимых слайдов
    spaceBetween: 30,            // Отступ между слайдами (px)
    autoplay: {
      delay: 3000,               // Задержка автопрокрутки (мс)
      disableOnInteraction: false, // Не отключать автопрокрутку при ручном листании
    },
    observer: true,              // Обновлять swiper при изменении DOM-структуры
    observeParents: true,        // Обновлять swiper при изменении родительских элементов
    watchSlidesProgress: true,   // Отслеживать прогресс отображения слайдов
    resizeObserver: true,        // Следить за изменением размеров контейнера
  },

  //~ Управление инициализацией и адаптивностью
  controls: {
    enabled: true,               // Глобальный переключатель (true — слайдер работает, false — полностью выключен)
    disableOnDesktop: false,     // true — отключать слайдер на десктопе и выстраивать карточки в обычную сетку
    desktopBreakpoint: 992       // Разрешение (px), выше которого слайдер уничтожается (если disableOnDesktop: true)
  }
};