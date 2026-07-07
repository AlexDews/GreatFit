<template>
  <div
    class="mobile-menu"
    :class="{ 'mobile-menu--open': isMenuOpen }"
  >
    <div
      class="mobile-menu__backdrop"
      @click="closeMenu"
    ></div>

    <nav class="mobile-menu__nav">
      <RouterLink
        to="/"
        class="mobile-menu__link"
        @click="closeMenu"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/"
        class="mobile-menu__link"
        @click="closeMenu"
      >
        Services
        <svg class="mobile-menu__icon"><use href="/images/sprite/sprite.svg#--icon-arrow-nav"></use></svg>
      </RouterLink>
      <RouterLink
        to="/"
        class="mobile-menu__link"
        @click="closeMenu"
      >
        Our Facility
        <svg class="mobile-menu__icon"><use href="/images/sprite/sprite.svg#--icon-arrow-nav"></use></svg>
      </RouterLink>
      <RouterLink
        to="/"
        class="mobile-menu__link"
        @click="closeMenu"
      >
        About
      </RouterLink>
      <RouterLink
        to="/"
        class="mobile-menu__link"
        @click="closeMenu"
      >
        Contact
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { useBurger } from "@/core/useBurger.js";

const { isMenuOpen, closeMenu } = useBurger();
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  visibility: hidden;
  transition: visibility 0.3s;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgb(0 0 0 / 40%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__nav {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 320px;
    height: 100%;
    background-color: #fff;
    padding: 100px 40px 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgb(0 0 0 / 10%);
  }

  &__link {
    color: $fontColor;
    text-decoration: none;
    font-size: 20px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  &__icon {
    width: 20px;
    height: 20px;
    fill: $fontColor;
  }

  // Стили при открытом состоянии
  &--open {
    visibility: visible;

    .mobile-menu__backdrop {
      opacity: 1;
    }

    .mobile-menu__nav {
      transform: translateX(0);
    }
  }
}
</style>
