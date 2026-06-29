import { reactive } from "vue";
import { POPUP_CONFIG } from "./popup.config.js";
import { bodyLock, bodyUnlock } from "../funcs.js"; // Твои родные функции лока скролла

export const popupStore = reactive({
  activePopup: null, // Имя текущего открытого попапа (например, 'callback')
  previousPopup: null,

  open(name) {
    if (!name) return;

    POPUP_CONFIG.on.beforeOpen(name);

    this.previousPopup = this.activePopup;
    this.activePopup = name;

    if (POPUP_CONFIG.bodyLock) {
      bodyLock();
      document.documentElement.classList.add(POPUP_CONFIG.classes.bodyActive);
    }

    if (POPUP_CONFIG.hashSettings.location) {
      history.pushState("", "", `#${name}`);
    }

    POPUP_CONFIG.on.afterOpen(name);
  },

  close() {
    if (!this.activePopup) return;

    POPUP_CONFIG.on.beforeClose(this.activePopup);
    const closedName = this.activePopup;

    this.activePopup = null;

    if (POPUP_CONFIG.bodyLock) {
      document.documentElement.classList.remove(POPUP_CONFIG.classes.bodyActive);
      bodyUnlock();
    }

    if (POPUP_CONFIG.hashSettings.location) {
      history.pushState("", "", window.location.href.split("#")[0]);
    }

    POPUP_CONFIG.on.afterClose(closedName);
  },
});

// Слушаем изменение хэша (авто-открытие при загрузке или навигации)
if (POPUP_CONFIG.hashSettings.goHash) {
  const checkHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      popupStore.open(hash);
    } else {
      popupStore.close();
    }
  };
  window.addEventListener('hashchange', checkHash);
}
