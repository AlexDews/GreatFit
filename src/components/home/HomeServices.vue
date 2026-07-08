<script setup>
import { ref, onMounted } from "vue";
import AppSwiper from "@modules/swiper/AppSlider.vue";
import AppButton from "@/components/ui/AppButton.vue";
import AppTitle from "@/components/ui/AppTitle.vue";

const swiperOptions = ref(null);

onMounted(() => {
  swiperOptions.value = {
    loop: false,
    autoplay: false,
    slidesPerView: "auto",
    spaceBetween: 50,
    navigation: {
      prevEl: ".services__btn--prev",
      nextEl: ".services__btn--next",
    },
    breakpoints: {
      320: { spaceBetween: 15, centeredSlides: true },
      768: { spaceBetween: 24 },
      992: { spaceBetween: 50 },
    },
  };
});

const servicesList = [
  {
    icon: "spa",
    title: "Spa area",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "room",
    title: "Changing Room",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "lessons",
    title: "Free Lessons",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "rug",
    title: "Free Rug",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "spa",
    title: "Spa area",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "room",
    title: "Changing Room",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "lessons",
    title: "Free Lessons",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
  {
    icon: "rug",
    title: "Free Rug",
    text: "Indulge in a world of relaxation and rejuvenation with our exceptional spa services. At our LA center",
  },
];
</script>

<template>
  <section class="main__services services">
    <div class="services__container">
      <AppTitle
        title="Our Services"
        subtitle="Sub heading to explain more"
      />
      <div class="services__slider">
        <div class="swiper-slide services__slide--promo">
          <div class="services__card card">
            <h4 class="card__title">Get Started With Your Free Trial</h4>
            <p class="card__text">
              Explore yoga at our serene studio with a complimentary session. Meet our instructors and discover the
              benefits
            </p>
            <AppButton to="/" class="card__btn card__btn--promo">Get Started Today</AppButton>
          </div>
        </div>
        <AppSwiper
          v-if="swiperOptions"
          :options="swiperOptions"
          :navigation="false"
          class="services__swiper"
        >
          <div
            v-for="(service, index) in servicesList"
            :key="index"
            class="swiper-slide services__slide"
          >
            <div class="services__card card">
              <div class="card__icon">
                <svg><use :href="`/images/sprite/sprite.svg#--icon-${service.icon}`"></use></svg>
              </div>

              <h4 class="card__title">{{ service.title }}</h4>
              <p class="card__text">
                {{ service.text }}
              </p>
              <AppButton class="card__btn">Learn More</AppButton>
            </div>
          </div>
        </AppSwiper>
      </div>
      <div class="services__nav">
        <button
          class="services__btn services__btn--prev"
          aria-label="To Back"
        >
          <svg><use href="/images/sprite/sprite.svg#--icon-slider-arrow"></use></svg>
        </button>
        <button
          class="services__btn services__btn--next"
          aria-label="To Front"
        >
          <svg><use href="/images/sprite/sprite.svg#--icon-slider-arrow"></use></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main {
  // .main__services
  &__services {
    padding: 96px 0;
  }
}
.services {
  overflow: hidden;

  // .services__container
  &__container {
  }

  // .services__slider
  &__slider {
    display: flex;
    align-items: center;
    margin-right: calc((100% - #{$maxWidthContainer}px) / -2 - 280px);

    @media (max-width: $mobile) {
      margin-right: 0;
      flex-direction: column;
      gap: 20px;
    }
  }

  // .services__slide--promo
  &__slide--promo {
    width: 320px;
    background-color: $colorAccent;
    padding: 100px 35px;
    border-radius: 25px;
    box-shadow:
      -48px 89px 80px 0 rgb(0 0 0 / 11%),
      -31px 58px 47px 0 rgb(0 0 0 / 8.35%),
      -18px 34px 25px 0 rgb(0 0 0 / 6.68%),
      -10px 18px 13px 0 rgb(0 0 0 / 5.5%),
      -4px 7px 7px 0 rgb(0 0 0 / 4.32%),
      -1px 2px 3px 0 rgb(0 0 0 / 2.65%);
    .card__title {
      color: #fff;
    }
    .card__text {
      color: #fff;
    }
  }

  // .services__card
  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  // .services__swiper
  &__swiper {
    padding-left: 50px;

    @media (max-width: $mobile) {
      padding-left: 0;
    }
  }

  // .services__slide
  &__slide {
    width: 294px;
    background-color: #f6f9fc;
    padding: 35px;
    border-radius: 25px;

    @media (max-width: $mobile) {
    }
  }

  // .services__nav
  &__nav {
    display: flex;
    justify-content: end;
    gap: 30px;
  }

  // .services__btn
  &__btn {
    display: flex;
    svg {
      width: 40px;
      fill: $colorAccent;
    }
  }

  // .services__btn--prev
  &__btn--prev {
    transform: rotate(180deg);
  }

  // .services__btn--next
  &__btn--next {
  }
}
.swiper-slide {
}
.card {
  // .card__title
  &__title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }

  // .card__text
  &__text {
    text-align: center;
    line-height: math.div(28, 16);
  }

  // .card__btn
  &__btn {
    background-color: transparent;
    box-shadow: inset 0 0 0 2px $colorAccent;
    color: $colorAccent;
    font-weight: 600;
    line-height: math.div(18, 16);
    padding: 10px 16px;

    @media (any-hover: hover) {
      &:hover {
        background-color: $colorAccent;
        color: #fff;
      }
    }
  }

  // .card__btn--promo
  &__btn--promo {
    background-color: #fff;
    box-shadow: none;
    padding: 16px 24px;
  }

  // .card__icon
  &__icon {
    margin-bottom: 10px;
    svg {
      width: 80px;
      height: 80px;
      fill: $colorAccent;
    }
  }
}
.swiper-button-disabled {
  svg {
    fill: rgb(72 92 70 / 70%);
  }
}
</style>
