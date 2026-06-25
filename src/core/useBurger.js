import { ref } from "vue";
import { useBodyLock } from './useBodyLock.js'; 
import { SYSTEM_CONFIG } from './system.config.js';

/**
 ** LuminaNexus Burger Menu Controller
 */
const isMenuOpen = ref(false);
const { lock, unlock } = useBodyLock();

export function useBurger() {
  //~ Открыть меню
  const openMenu = () => {
    lock();
    isMenuOpen.value = true;
    document.documentElement.classList.add(SYSTEM_CONFIG.burger.menuOpenClass);
  };

  //~ Закрыть меню
  const closeMenu = () => {
    unlock();
    isMenuOpen.value = false;
    document.documentElement.classList.remove(SYSTEM_CONFIG.burger.menuOpenClass);
  };

  //~ Переключить меню
  const toggleMenu = () => {
    isMenuOpen.value ? closeMenu() : openMenu();
  };

  return { isMenuOpen, openMenu, closeMenu, toggleMenu };
}
