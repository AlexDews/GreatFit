<template>
  <header class="header__container">
    <div class="header__wrapper">ывапрывапрпыр
      <div class="logo header__logo">
        <RouterLink to="/" class="logo__link">
          <img
            src="@/assets/images/logo/logo.svg"
            alt="Логотип Название"
          />
          <div class="logo__text">
            <strong>
              Great
              <span>Fit</span>
            </strong>
            <span>Yoga Studio</span>
          </div>
        </RouterLink>
      </div>
      <nav class="header__nav nav">
        <RouterLink to="/" class="logo__link">Home</RouterLink>
        <RouterLink to="/" class="logo__link">Services</RouterLink>
        <RouterLink to="/" class="logo__link">Our Facility</RouterLink>
        <RouterLink to="/" class="logo__link">About</RouterLink>
        <RouterLink to="/" class="logo__link">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>
<script setup>
</script>
