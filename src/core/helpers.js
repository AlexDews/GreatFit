/**
 ** LuminaNexus Data Helpers
 */

//~ Вытащить только цифры из строки
export const getDigFromString = (item) => parseInt(item.replace(/\D/g, "")) || 0;

//~ Форматирование чисел (1000000 -> 1 000 000)
export const getDigFormat = (item) => item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

//~ Уникализация массивов
export const uniqArray = (array) => [...new Set(array)];
