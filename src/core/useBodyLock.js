import { ref } from "vue";
import { SYSTEM_CONFIG } from './system.config.js';

/**
 ** LuminaNexus Scroll Lock Engine
 */
const isLocked = ref(false);
let bodyLockStatus = true; // Защита от дебаунса (двойных кликов)

const getScrollWidth = () => `${window.innerWidth - document.documentElement.clientWidth}px`;

export function useBodyLock() {
  //~ Включить блокировку скролла
  const lock = (delay = SYSTEM_CONFIG.burger.bodyLockDelay) => {
    if (!bodyLockStatus) return;

    const lockPadding = document.querySelectorAll(SYSTEM_CONFIG.burger.paddingAttr);
    const paddingValue = getScrollWidth();

    lockPadding.forEach((el) => (el.style.paddingRight = paddingValue));
    document.body.style.paddingRight = paddingValue;
    document.documentElement.classList.add(SYSTEM_CONFIG.burger.lockClass);

    bodyLockStatus = false;
    isLocked.value = true;
    setTimeout(() => (bodyLockStatus = true), delay);
  };

  //~ Выключить блокировку скролла
  const unlock = (delay = SYSTEM_CONFIG.burger.bodyLockDelay) => {
    if (!bodyLockStatus) return;

    const lockPadding = document.querySelectorAll(SYSTEM_CONFIG.burger.paddingAttr);

    lockPadding.forEach((el) => (el.style.paddingRight = "0px"));
    document.body.style.paddingRight = "0px";
    document.documentElement.classList.remove(SYSTEM_CONFIG.burger.lockClass);

    bodyLockStatus = false;
    isLocked.value = false;
    setTimeout(() => (bodyLockStatus = true), delay);
  };

  //~ Переключить состояние
  const toggleLock = (delay = SYSTEM_CONFIG.burger.bodyLockDelay) => {
    document.documentElement.classList.contains(SYSTEM_CONFIG.burger.lockClass) ? unlock(delay) : lock(delay);
  };

  return { isLocked, lock, unlock, toggleLock };
}
