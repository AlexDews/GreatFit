<template>
  <header class="header">
    <div class="header__container">
      <div class="header__wrapper">
        <div class="logo header__logo">
          <RouterLink
            to="/"
            class="logo__link"
          >
            <img
              src="@/assets/images/logo/logo.svg"
              alt="Логотип Название"
            />
            <div class="logo__text">
              <strong>
                Great
                <span class="logo__accent">Fit</span>
              </strong>
              <span class="logo__subtext">Yoga Studio</span>
            </div>
          </RouterLink>
        </div>

        <nav class="header__nav nav">
          <RouterLink
            to="/"
            class="nav__link"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/"
            class="nav__link"
          >
            Services
            <svg class="nav__icon"><use href="/images/sprite/sprite.svg#--icon-arrow-nav"></use></svg>
          </RouterLink>
          <RouterLink
            to="/"
            class="nav__link"
          >
            Our Facility
            <svg class="nav__icon"><use href="/images/sprite/sprite.svg#--icon-arrow-nav"></use></svg>
          </RouterLink>
          <RouterLink
            to="/"
            class="nav__link"
          >
            About
          </RouterLink>
          <RouterLink
            to="/"
            class="nav__link"
          >
            Contact
          </RouterLink>
        </nav>

        <button
          class="burger-btn"
          :class="{ 'burger-btn--active': isMenuOpen }"
          aria-label="Открыть меню"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <AppButton class="header__btn">
          <!-- <div class="icon-f-cart header__cart"></div> -->
          <svg class="header__cart"><use href="/images/sprite/sprite.svg#--icon-cart"></use></svg>
          <span>Shop Now</span>
        </AppButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useBurger } from "@/core/useBurger.js";
import AppButton from "@/components/ui/AppButton.vue";

const { isMenuOpen, toggleMenu } = useBurger();
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
  }
  &__cart {
    width: 15px;
    height: 16px;
    fill: $colorBg;
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;

  // .logo__link
  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 5px;
    }
  }

  // .logo__text
  &__text {
    display: flex;
    flex-direction: column;
    align-items: end;
    font-family: Montserrat, sans-serif;
    strong {
      font-size: 24px;
      font-weight: 700;
    }
  }

  &__accent {
    font-size: 24px;
    color: $colorAccent;
    font-weight: 700;
  }

  &__subtext {
    display: flex;
    font-size: 12px;
    font-weight: 500;
    margin-top: -5px;
  }
}

.nav {
  // .nav__link
  &__link {
    position: relative;
    display: inline-flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    font-family: Inter, sans-serif;
    font-weight: 500;
    gap: 5px;
    color: #000;
    padding: 3px 0;
    transition: color 0.3s ease 0s;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: $fontMainColor;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.3s ease;
    }

    @media (any-hover: hover) {
      &:hover {
        .nav__icon {
          transform: rotate(180deg);

          use {
            fill: $fontMainColor;
          }
        }
        &::after {
          transform: scaleX(1);
        }

        color: $fontMainColor;
      }
    }
  }

  // .nav__icon
  &__icon {
    display: inline-block;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
    transition: transform 0.3s ease;
    vertical-align: middle;
    width: 16px;
    height: 16px;

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    use {
      fill: #000;
      transition: fill 0.3s ease;
    }

    // &::before {
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   font-size: 19px;
    //   line-height: 1;
    //   transform-origin: center center;
    //   transition: transform 0.3s ease;
    // }
  }
}

.burger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;
  padding: 0;

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #000;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }
}

@media (width <=991.98px) {
  .header__nav,
  .header__btn {
    display: none;
  }

  .burger-btn {
    display: flex;
  }

  .burger-btn--active {
    span {
      &:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}
</style>
