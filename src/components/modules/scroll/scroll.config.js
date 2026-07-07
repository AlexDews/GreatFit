/**
 ** LuminaNexus ModuX Scroll & Header Configuration
 * Все настройки плавного скролла и динамического поведения шапки сайта.
 */

import { SYSTEM_CONFIG } from "@/core/system.config.js";

export const SCROLL_CONFIG = {
  // Настройки плавной прокрутки к блокам
  goto: {
    offsetTop: 0,      // Дополнительный отступ сверху (px)
    speed: 1000,       // Скорость анимации скролла в мс
    noHeader: false,   // Игнорировать ли шапку по умолчанию
  },
  
  // Настройки динамической шапки (теперь используются в TheHeader.vue)
  header: {
    startPoint: 150,   // Через сколько px скролла «заряжать» fixed-режим
  },
  
  // Селекторы для работы сервисов
  selectors: {
    header: "header.header",
    menuOpenClass: SYSTEM_CONFIG.burger.menuOpenClass,
    burgerBtn: SYSTEM_CONFIG.burger.burgerBtn,
  }
};