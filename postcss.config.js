import pxtorem from "postcss-pxtorem";
import sortMediaQueries from "postcss-sort-media-queries";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue: 16, // Базовый размер шрифта (1rem = 16px)
      propList: ["*"], // Конвертировать все свойства
      selectorBlackList: [".no-rem", "^.swiper-"], // Селекторы-исключения
      replace: true, // Заменять px на rem в итоговом CSS
      mediaQuery: false, // Не конвертировать в медиа-запросах
      minPixelValue: 2, // Все что ниже 2px останется в px
    }),
    sortMediaQueries({
      sort: "mobile-first", // Магия группировки
    }),
  ],
};