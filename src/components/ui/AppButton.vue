<template>
  <button class="ui-btn">
    <slot>Button</slot>
  </button>
</template>
<script setup></script>
<style lang="scss" scoped>
.ui-btn {
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: $colorAccent;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease 0s;

  @media (any-hover: hover) {
    &:hover {
      background-color: $fontMainColor;
    }
  }
}
</style>
