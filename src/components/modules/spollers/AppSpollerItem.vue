<template>
  <div class="ln-spollers__item">
    <button
      type="button"
      class="ln-spollers__title"
      :class="{ [SPOLLER_DEFAULTS.activeClass]: isOpen }"
      :tabindex="isMediaMatched ? undefined : '-1'"
      @click="spollersState.toggleSpoller(id)"
    >
      <slot name="title"></slot>
    </button>

    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        v-show="isOpen || !isMediaMatched"
        class="ln-spollers__body-wrapper"
      >
        <div class="ln-spollers__body">
          <slot name="content"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { SPOLLER_DEFAULTS } from "./spollers.config.js";

const props = defineProps({
  id: { type: [String, Number], required: true }, // Уникальный ID внутри группы
});

const spollersState = inject("spollersState");

const isOpen = computed(() => spollersState.activeIds.value.has(props.id));
const isMediaMatched = computed(() => spollersState.isMediaMatched.value);
const speed = spollersState.speed;

/* --- Анимации _slideUp / _slideDown через Vue Transition --- */
const beforeEnter = (el) => {
  el.style.height = "0";
  el.style.overflow = "hidden";
  el.style.transition = `height ${speed}ms ease`;
};

const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const afterEnter = (el) => {
  el.style.height = "";
  el.style.overflow = "";
};

const beforeLeave = (el) => {
  el.style.height = el.offsetHeight + "px";
  el.style.overflow = "hidden";
  el.style.transition = `height ${speed}ms ease`;
};

const leave = (el) => {
  // Микротаймаут, чтобы браузер успел применить текущую высоту перед её обнулением
  requestAnimationFrame(() => {
    el.style.height = "0";
  });
};

const afterLeave = (el) => {
  el.style.height = "";
  el.style.overflow = "";
};
</script>

<style scoped>
.ln-spollers__item {
  border-bottom: 1px solid #ddd;
}
.ln-spollers__title {
  width: 100%;
  text-align: left;
  padding: 15px 0;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}
.ln-spollers__body {
  padding-bottom: 15px;
  color: #555;
  line-height: 1.5;
}
</style>
