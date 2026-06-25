import { ref } from "vue";
import { formConfig } from "./forms.config.js";
import IMask from "imask";

export function useFormValidation() {
  const errors = ref({}); // Хранилище ошибок { имя_поля: "текст ошибки" }
  const isSending = ref(false); // Состояние отправки формы (заменяет класс ._sending)

  // ==========================================================================
  // --- 1. ВАЛИДАЦИЯ И БЕЗОПАСНОСТЬ ---
  // ==========================================================================

  const containsPotentialXSS = (str) => {
    if (typeof str !== "string") return false;
    return formConfig.security.xssPatterns.some((pattern) => pattern.test(str));
  };

  const luhnCheck = (n) => {
    let s = 0;
    let a = false;
    for (let i = n.length - 1; i >= 0; i--) {
      let d = parseInt(n[i], 10);
      if (a) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      s += d;
      a = !a;
    }
    return s % 10 === 0;
  };

  const checkExpiry = (val) => {
    const [m, y] = val.split("/").map(Number);
    if (!m || !y || m < 1 || m > 12) return false;
    const now = new Date();
    const expiry = new Date(2000 + y, m, 0);
    return expiry > now;
  };

  const isValidMimeType = (file, allowedTypes = []) => {
    const types = allowedTypes.length ? allowedTypes : formConfig.security.allowedFileTypes || [];
    if (!file || !types.length) return true;
    const fileType = file.type.toLowerCase();
    return types.some((type) => {
      if (type.endsWith("/*")) return fileType.startsWith(type.slice(0, -1));
      return fileType === type.toLowerCase();
    });
  };

  const validateField = (fieldName, value, type, isChecked = false) => {
    let error = null;
    const val = typeof value === "string" ? value.trim() : "";
    const cleanVal = val.replace(/\D/g, "");

    if (formConfig.security.enableSanitization && containsPotentialXSS(val)) {
      error = "Поле содержит недопустимые символы (XSS защита)";
    } else if (type === "checkbox") {
      if (!isChecked) error = formConfig.messages.checkbox;
    } else if (type === "select" && !value) {
      error = formConfig.messages.select;
    } else if (type === "name" && !val) {
      error = formConfig.messages.name;
    } else if (!val && type === "required") {
      error = formConfig.messages.required;
    } else if (val) {
      if (type === "email" && !formConfig.validation.email.pattern.test(val)) {
        error = formConfig.messages.email;
      } else if (type === "phone" && cleanVal.length < 11) {
        error = formConfig.messages.phone;
      } else if (type === "card") {
        if (cleanVal.length < 16) {
          error = "Номер карты должен содержать минимум 16 цифр";
        } else if (!luhnCheck(cleanVal)) {
          error = formConfig.messages.card;
        }
      } else if (type === "cardCvc" && cleanVal.length < 3) {
        error = formConfig.messages.cardCvc;
      } else if (type === "cardExpiry" && !checkExpiry(val)) {
        error = formConfig.messages.cardExpiry || "Срок действия карты истек";
      } else if (type === "date") {
        const [d, m, y] = val.split(".").map(Number);
        const inputDate = new Date(y, m - 1, d);
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + (formConfig.imask.date.minDateOffset || 0));
        minDate.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        if (!formConfig.validation.date.pattern.test(val)) {
          error = formConfig.messages.date;
        } else if (inputDate < minDate) {
          error = formConfig.messages.datePast;
        }
      }
    }

    if (error) {
      errors.value[fieldName] = error;
    } else {
      delete errors.value[fieldName];
    }
  };

  const validateFiles = (fieldName, files, allowedTypesStr = "") => {
    if (!files || files.length === 0) return true;
    const allowedTypes = allowedTypesStr ? allowedTypesStr.split(",").map((t) => t.trim()) : [];

    for (let file of Array.from(files)) {
      if (!isValidMimeType(file, allowedTypes)) {
        errors.value[fieldName] = `Недопустимый тип файла: ${file.name}`;
        return false;
      }
      if (file.size > formConfig.security.maxFileSize) {
        errors.value[fieldName] = `Файл слишком большой (макс. 10МБ): ${file.name}`;
        return false;
      }
    }
    delete errors.value[fieldName];
    return true;
  };

  const clearErrors = () => {
    errors.value = {};
  };

  // ==========================================================================
  // --- 2. UI УТИЛИТЫ (АВТО-ВЫСОТА И ОЧИСТКА С ОЗВУЧКОЙ) ---
  // ==========================================================================

  /**
   * Корректировка высоты textarea (заменяет старый метод updateHeight)
   */
  const updateTextareaHeight = (e, maxH = Infinity) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
    el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
  };

  /**
   * Озвучивание количества ошибок для скринридеров (Accessibility)
   */
  const announceErrors = () => {
    const errorCount = Object.keys(errors.value).length;
    if (!errorCount) return;

    const alertDiv = document.createElement("div");
    alertDiv.setAttribute("aria-live", "assertive");
    alertDiv.className = "visually-hidden";
    alertDiv.textContent = `В форме найдено ${errorCount} ошибок. Пожалуйста, проверьте поля.`;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 1000);
  };

  // ==========================================================================
  // --- 3. AJAX ОТПРАВКА ФОРМЫ ---
  // ==========================================================================

  /**
   * Универсальный метод отправки данных на сервер (заменяет _sendForm)
   */
  const sendFormAjax = async (action, method, rawData, errorPopupId = null) => {
    isSending.value = true;
    try {
      // Поддерживаем отправку как объекта, так и FormData
      let bodyData = rawData;
      if (!(rawData instanceof FormData)) {
        bodyData = new FormData();
        Object.keys(rawData).forEach((key) => bodyData.append(key, rawData[key]));
      }

      const response = await fetch(action || "#", {
        method: method || "POST",
        body: bodyData,
      });

      if (response.ok) {
        const result = await response.json();

        // Генерируем глобальное событие для внешних модулей (попапы, уведомления)
        document.dispatchEvent(new CustomEvent("modux:formSent", { detail: { result } }));
        return { success: true, data: result };
      } else {
        throw new Error(`Server returned status ${response.status}`);
      }
    } catch (error) {
      console.error("ModuX AJAX Error:", error);

      // Блок обработки и вызова попапа ошибок сервера
      document.dispatchEvent(
        new CustomEvent("formError", {
          detail: { popupId: errorPopupId, error },
        }),
      );
      return { success: false, error };
    } finally {
      isSending.value = false;
    }
  };

  return {
    errors,
    isSending,
    validateField,
    validateFiles,
    clearErrors,
    updateTextareaHeight,
    announceErrors,
    sendFormAjax,
  };
}

// ==========================================================================
// --- 4. МАСКИ (Ленивая Vue-директива для iMask) ---
// ==========================================================================

/**
 * Кастомная директива v-imask. Инициализирует маску при монтировании элемента во Vue.
 * Избавляет от необходимости ловить события focusin по всему документу.
 */
export const vImask = {
  mounted(el, binding) {
    const type = binding.value?.type;
    if (!formConfig.imask?.enabled || !type) return;

    let maskOptions = null;

    if (type === "phone" && formConfig.imask.phone) maskOptions = formConfig.imask.phone;
    else if (type === "card" && formConfig.imask.card?.enabled) maskOptions = formConfig.imask.card;
    else if (type === "cardExpiry" && formConfig.imask.cardExpiry?.enabled) maskOptions = formConfig.imask.cardExpiry;
    else if (type === "cardCvc" && formConfig.imask.cardCvc?.enabled) maskOptions = formConfig.imask.cardCvc;
    else if (type === "date" && formConfig.imask.date) {
      maskOptions = {
        mask: Date,
        pattern: formConfig.imask.date.pattern || "DD.MM.YYYY",
        blocks: {
          DD: { mask: IMask.MaskedRange, from: formConfig.imask.date.blocks?.DD?.from || 1, to: formConfig.imask.date.blocks?.DD?.to || 31 },
          MM: { mask: IMask.MaskedRange, from: formConfig.imask.date.blocks?.MM?.from || 1, to: formConfig.imask.date.blocks?.MM?.to || 12 },
          YYYY: { mask: IMask.MaskedRange, from: formConfig.imask.date.blocks?.YYYY?.from || 1900, to: formConfig.imask.date.blocks?.YYYY?.to || 2100 },
        },
        format: (date) => {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          return `${day}.${month}.${date.getFullYear()}`;
        },
        parse: (str) => {
          const [d, m, y] = str.split(".");
          return new Date(y, m - 1, d);
        },
        lazy: formConfig.imask.date.lazy !== undefined ? formConfig.imask.date.lazy : false,
      };
    } else if (formConfig.imask[type]) {
      maskOptions = formConfig.imask[type];
    }

    if (maskOptions) {
      // Сохраняем инстанс маски в элемент, чтобы иметь к нему доступ при необходимости
      el.maskInstance = IMask(el, maskOptions);
    }
  },
  unmounted(el) {
    if (el.maskInstance) {
      el.maskInstance.destroy();
    }
  },
};
