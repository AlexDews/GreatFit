/**
 ** LuminaNexus ModuX Maps Configuration (Vue Edition)
 * Настройки провайдеров карт и путей к API.
 */
export const MAPS_CONFIG = {
  // Дефолтные значения, если они не переданы в пропсах
  defaults: {
    type: "yandex",
    zoom: 12,
    center: [55.755864, 37.617698], // Москва по умолчанию
    icon: "img/icons/map.svg",
    size: [40, 40],
    offset: [-20, -20],
  },

  // Эндпоинты скриптов провайдеров
  loaders: {
    google: (key, callback) => `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callback}`,
    yandex: (key) => `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${key}`,
    "2gis": (key) => `https://maps.api.2gis.ru/2.0/loader.js?pkg=full&key=${key}`,
  },
};
