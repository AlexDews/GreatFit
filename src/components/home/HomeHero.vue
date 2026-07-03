<template>
  <section class="main__hero hero">
    <div class="hero__wrapper">
      <div class="hero__image">
        <AppPicture
          class="hero__img"
          name="first"
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
            <AppButton class="hero__btn-link">Book A Session</AppButton>
            <AppButton class="hero__btn-contacts">
              <span>Contact Us</span>
              <i class="icon-f-arrow hero__arrow"></i>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//~ Импортируем базовые UI-компоненты
import AppButton from "@/components/ui/AppButton.vue";
import AppPicture from "@/components/ui/AppPicture.vue";
</script>

<style lang="scss" scoped>

.main__hero {
}

.hero {
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
      user-select: none;
      -webkit-user-drag: none;
    }
  }

  // .hero__container
  &__container {
  }

  // .hero__content
  &__content {
    @include adaptiveValue("margin-top", 120, 20);

    position: relative;
    width: 45%;
  }

  // .hero__title
  &__title {
    @include adaptiveValue("font-size", 66, 46);

    font-weight: 600;
    text-transform: uppercase;
    line-height: math.div(130, 100) * 100%;
    color: $fontMainColor;
    margin-bottom: 20px;
  }

  // .hero__subtitle
  &__subtitle {
    line-height: math.div(28, 16);
    color: $fontMainColor;
  }

  // .hero__btn
  &__btn {
    @include adaptiveValue("margin-top", 35, 20);

    display: flex;
    gap: 10px;
  }

  // .hero__btn-link
  &__btn-link {
  }

  // .hero__btn-contacts
  &__btn-contacts {
    display: flex;
    color: $fontMainColor;
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
  }

  // .hero__arrow
  &__arrow {
    transition: transform 0.3s ease 0s;
  }
}
</style>
