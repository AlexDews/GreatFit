<script setup>
//~ Импортируем базовые UI-компоненты
import AppButton from "@/components/ui/AppButton.vue";
import AppPicture from "@/components/ui/AppPicture.vue";
</script>

<template>
  <section class="main__hero hero ptb">
    <div class="hero__wrapper">
      <div class="hero__image">
        <AppPicture
          class="hero__img"
          name="first"
          is-tab="first-tablet"
          is-mob-small="first-mobile"
          alt="Yoga"
          loading="eager"
          @contextmenu.prevent
        />
      </div>
      <div class="hero__container">
        <div class="hero__content">
          <div class="hero__title"><h1>Yoga First Fitness Always</h1></div>
          <div class="hero__subtitle">
            <p>
              Welcome to Great Fit Yoga and Fitness Center, where tradition meets innovation. Our experts guide you
              through transformative yoga and fitness programs designed to strengthen your body and calm your mind.
            </p>
          </div>
          <div class="hero__btn">
            <AppButton
              to="/"
              class="hero__btn-link"
            >
              Book A Session
            </AppButton>
            <AppButton
              to="/"
              class="hero__btn-contacts"
            >
              <span>Contact Us</span>
              <svg class="hero__arrow"><use href="/images/sprite/sprite.svg#--icon-arrow"></use></svg>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main__hero {
}

.hero {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100vh;

  // .hero__wrapper
  &__wrapper {
  }

  // .hero__image
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: 100vh;
    overflow: hidden;
  }

  // .hero__img
  &__img {
    width: 100%;
    height: 100%;

    :deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      user-select: none;
      -webkit-user-drag: none;
    }
  }

  // .hero__container
  &__container {
  }

  // .hero__content
  &__content {
    position: relative;
    width: 45%;

    @media (max-width: $tablet) {
      width: 75%;
    }

    @media (max-width: $mobile) {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 90%;
    }
  }

  // .hero__title
  &__title {
    @include adaptiveValue("font-size", 66, 40, $containerWidth, $mobile);
    @include adaptiveValue("margin-bottom", 20, 10);

    font-weight: 600;
    text-transform: uppercase;
    line-height: math.div(130, 100) * 100%;
    color: $fontMainColor;

    @media (max-width: $mobileSmall) {
      font-size: 28px;
    }
  }

  // .hero__subtitle
  &__subtitle {
    line-height: math.div(28, 16);
    color: $fontMainColor;
  }

  // .hero__btn
  &__btn {
    margin-top: 35px;
    gap: 10px;
    display: flex;
  }

  // .hero__btn-link
  &__btn-link {
    @media (max-width: $mobileSmall) {
      font-size: 14px;
      padding: 15px 10px;
    }
  }

  // .hero__btn-contacts
  &__btn-contacts {
    display: flex;
    color: $fontMainColor;
    fill: $fontMainColor;
    font-weight: 600;
    gap: 5px;
    justify-content: center;
    align-items: center;
    background-color: transparent;

    @media (any-hover: hover) {
      &:hover {
        background-color: transparent;
        .hero__arrow {
          transform: translateX(3px);
        }
      }
    }

    @media (max-width: $mobile) {
      background-color: #fff;
    }

    @media (max-width: $mobileSmall) {
      font-size: 14px;
      padding: 15px 10px;
    }
  }

  // .hero__arrow
  &__arrow {
    transition: transform 0.3s ease 0s;
    width: 16px;
    height: 16px;
  }
}
</style>
