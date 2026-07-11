<script setup>
import AppPicture from "@/components/ui/AppPicture.vue";
import AppButton from "@/components/ui/AppButton.vue";
</script>

<template>
  <section class="main__member member ptb">
    <div class="member__content">
      <div class="member__bg -ibg">
        <AppPicture
          class="member__img"
          name="member"
          alt="Yoga"
          loading="lazy"
          @contextmenu.prevent
        />
      </div>

      <div class="member__body">
        <h2 class="member__title">Free 30 Day MemberShip</h2>
        <p class="member__text">
          Enjoy a complimentary 30-day free trial of our yoga and fitness classes. Experience our serene studio, expert
          trainers, and diverse class offerings without any commitment. Discover the benefits of yoga and transform your
          well-being with us
        </p>
        <div class="member__btn">
          <AppButton
            to="/"
            class="member__btn-link"
          >
            Book A Session
          </AppButton>
          <AppButton
            to="/"
            class="member__btn-contacts"
          >
            <span>Contact Us</span>
            <svg class="member__arrow"><use href="/images/sprite/sprite.svg#--icon-arrow"></use></svg>
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main {
  // .main__member
  &__member {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }
}
.member {
  // .member__content
  &__content {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    overflow: hidden;

    // Внутренние отступы секции задают высоту фоновой картинки на десктопе
    @include adaptiveValue("padding-top", 90, 45);
    @include adaptiveValue("padding-bottom", 90, 45);
    @include adaptiveValue("padding-left", 60, 20);
    @include adaptiveValue("padding-right", 60, 20);

    @media (max-width: $mobile) {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  // .member__img
  :deep(.member__img) {
    img {
      object-fit: cover;
    }
  }

  &__body {
    grid-column: 2;
    z-index: 2;
    background-color: #fff;
    border-radius: 25px;
    width: 100%;

    @include adaptiveValue("padding", 48, 24);

    @media (max-width: $mobile) {
      grid-column: auto;
    }
  }

  // .member__title
  &__title {
    font-weight: 700;
    margin-bottom: 25px;

    @include adaptiveValue("margin-bottom", 25, 15);
    @include adaptiveValue("font-size", 52, 24);
  }

  // .member__text
  &__text {
    line-height: math.div(28, 16);

    @include adaptiveValue("font-size", 16, 14);
  }

  // .member__btn
  &__btn {
    @include adaptiveValue("margin-top", 35, 20);

    display: flex;
    gap: 10px;
  }

  // .member__btn-link
  &__btn-link {
    @media (max-width: $mobileSmall) {
      font-size: 14px;
      padding: 15px 10px;
    }
  }

  // .member__btn-contacts
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
        .member__arrow {
          transform: translateX(3px);
        }
      }
    }

    @media (max-width: $mobileSmall) {
      font-size: 14px;
      padding: 15px 10px;
    }
  }

  // .member__arrow
  &__arrow {
    transition: transform 0.3s ease 0s;
    width: 16px;
    height: 16px;
  }
}
</style>
