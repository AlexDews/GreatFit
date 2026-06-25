/**
 ** LuminaNexus ModuX Range Configuration (Vue Edition)
 * Базовые дефолтные настройки для плагина noUiSlider.
 */
export const RANGE_DEFAULTS = {
  start: [0, 200000], 
  connect: true,
  step: 100,
  range: {
    'min': 0,
    'max': 200000
  },
  format: {
    // Форматирование для вывода в инпут (добавляет пробелы: 150000 -> 150 000)
    to: (value) => Math.round(value).toLocaleString('ru-RU'), 
    // Парсинг обратно в число для слайдера
    from: (value) => Number(String(value).replace(/[^0-9.-]+/g, ""))
  }
};