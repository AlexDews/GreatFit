<template>
  <component 
    :is="to ? 'RouterLink' : 'button'" 
    :to="to" 
    class="ui-btn"
  >
    <slot>Button</slot>
  </component>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.ui-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: $colorAccent;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease 0s, color 0.3s ease 0s;

  @media (any-hover: hover) {
    &:hover {
      background-color: $fontMainColor;
    }
  }
}
</style>

<!-- 
<AppButton to="/about">Learn More About Us</AppButton>
<AppButton type="submit" @click="doSomething">Отправить</AppButton> 
-->