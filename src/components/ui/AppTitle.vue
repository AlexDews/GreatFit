<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="app-title" data-animate="fade-left">
    <h2 class="app-title__main">{{ title }}</h2>
    <p
      v-if="subtitle"
      class="app-title__sub"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.app-title {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 48px;

  // .app-title__main
  &__main {
    font-weight: 700;
    font-size: 52px;
    color: $fontColor;
  }

  // .app-title__sub
  &__sub {
    font-weight: 500;
    font-size: 20px;
    color: #000;
  }
}
</style>
