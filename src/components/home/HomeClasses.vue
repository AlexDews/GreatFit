<script setup>
import AppTitle from "@/components/ui/AppTitle.vue";
import AppTabs from "@modules/tabs/AppTabs.vue";
import AppPicture from "@/components/ui/AppPicture.vue";
import AppButton from "@/components/ui/AppButton.vue";

const classItems = [
  {
    id: "beginners",
    title: "Beginners Yoga",
    text: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength, flexibility, and confidence. Start your yoga journey with us in a supportive and friendly environment.",
    features: [
      {
        name: "Free Rugs",
        text: "We provide clean, premium mats for every session. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Changing Room",
        text: "Spacious lockers and comfortable changing zones. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Personal Trainer",
        text: "Our experts will guide your every movement. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Shower Access",
        text: "Fresh towels and hot water are always ready. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
    ],
  },
  {
    id: "stretching",
    title: "Stretching",
    text: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength, flexibility, and confidence. Start your yoga journey with us in a supportive and friendly environment.",
    features: [
      {
        name: "Free Rugs",
        text: "We provide clean, premium mats for every session. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Changing Room",
        text: "Spacious lockers and comfortable changing zones. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Personal Trainer",
        text: "Our experts will guide your every movement. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Shower Access",
        text: "Fresh towels and hot water are always ready. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
    ],
  },
  {
    id: "fly",
    title: "Fly-Yoga",
    text: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength, flexibility, and confidence. Start your yoga journey with us in a supportive and friendly environment.",
    features: [
      {
        name: "Free Rugs",
        text: "We provide clean, premium mats for every session. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Changing Room",
        text: "Spacious lockers and comfortable changing zones. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Personal Trainer",
        text: "Our experts will guide your every movement. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Shower Access",
        text: "Fresh towels and hot water are always ready. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
    ],
  },
  {
    id: "yin",
    title: "Yin-Yoga",
    text: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength, flexibility, and confidence. Start your yoga journey with us in a supportive and friendly environment.",
    features: [
      {
        name: "Free Rugs",
        text: "We provide clean, premium mats for every session. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Changing Room",
        text: "Spacious lockers and comfortable changing zones. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Personal Trainer",
        text: "Our experts will guide your every movement. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Shower Access",
        text: "Fresh towels and hot water are always ready. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
    ],
  },
  {
    id: "zoomba",
    title: "Zoomba",
    text: "Perfect for newcomers, our beginners yoga classes focus on foundational poses and techniques to build strength, flexibility, and confidence. Start your yoga journey with us in a supportive and friendly environment.",
    features: [
      {
        name: "Free Rugs",
        text: "We provide clean, premium mats for every session. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Changing Room",
        text: "Spacious lockers and comfortable changing zones. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Personal Trainer",
        text: "Our experts will guide your every movement. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
      {
        name: "Shower Access",
        text: "Fresh towels and hot water are always ready. Perfect for newcomers, our beginners yoga classes focus on foundational.",
      },
    ],
  },
];
</script>

<template>
  <section class="main__classes classes ptb">
    <div class="classes__container">
      <AppTitle
        title="Latest Classes"
        subtitle="Sub heading to explain more"
      />
      <div class="classes__tabs">
        <AppTabs
          id="yoga"
          :items="classItems"
          class-tab="classes__tab"
          class-titles="classes__titles"
        >
          <template
            v-for="(item, index) in classItems"
            :key="item.id || index"
            #[`content-${index}`]
          >
            <div class="classes__content">
              <div class="classes__item">
                <div class="classes__image">
                  <AppPicture
                    class="classes__img"
                    name="tabs-1"
                    :alt="item.title"
                    loading="lazy"
                    @contextmenu.prevent
                  />
                </div>
                <div class="classes__info">
                  <h3 class="classes__info-title">{{ item.title }}</h3>
                  <p class="classes__info-text">{{ item.text }}</p>
                  <div class="classes__features">
                    <div
                      v-for="(feat, fIndex) in item.features"
                      :key="fIndex"
                      class="classes__feature"
                    >
                      <span class="classes__feature-num">{{ fIndex + 1 }}</span>
                      <span class="classes__feature-name">{{ feat.name }}</span>
                      <span class="classes__feature-text">{{ feat.text }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <AppButton
                to="/"
                class="classes__btn-link"
              >
                Get Your Free Trial
              </AppButton>
            </div>
          </template>
        </AppTabs>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main {
  // .main__classes
  &__classes {
    background-color: #F1EFE5;
  }
}
.classes {
  // .classes__container
  &__container {
  }

  // .classes__tabs
  &__tabs {
  }

  // .classes__titles
  :deep(.classes__titles) {
    display: flex;
    justify-content: center;
    border: none;
  }

  // .classes__tab
  :deep(.classes__tab) {
    border: none;
    color: $fontColor;
    &._tab-active {
      border: 2px solid $colorAccent;
      border-radius: 15px;
      color: $fontColor;
    }
  }

  // .classes__content
  &__content {
    display: flex;
    color: $fontColor;
    flex-direction: column;
    align-items: center;

    @include adaptiveValue("gap", 48, 30, $containerWidth, $tablet);
  }

  // .classes__item
  &__item {
    display: flex;
    align-items: flex-start;

    @include adaptiveValue("gap", 48, 30, $containerWidth, $tablet);

    @media (max-width: $tablet) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  // .classes__image
  &__image {
    flex: 0 0 50%;
    min-width: 0;
  }

  // .classes__img
  :deep(.classes__img) {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;

    @media (max-width: $tablet) {
      max-width: 100%;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px; // Скругление как на скрине

      @media (max-width: $tablet) {
      max-width: 100%;
    }
    }
  }

  // .classes__info
  &__info {
    flex: 1 1 60%;
    min-width: 0;
  }

  // .classes__info-title
  &__info-title {
    @include adaptiveValue("font-size", 24, 18, $containerWidth, $tablet);
    @include adaptiveValue("margin-bottom", 25, 10, $containerWidth, $tablet);

    font-weight: 700;
  }

  // .classes__info-text
  &__info-text {
    line-height: math.div(28, 16);

    @include adaptiveValue("margin-bottom", 48, 30, $containerWidth, $tablet);
  }

  // .classes__features
  &__features {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include adaptiveValue("gap", 48, 30, $containerWidth, $tablet);
  }

  // .classes__feature
  &__feature {
    display: flex;
    flex-direction: column;

    @include adaptiveValue("gap", 25, 10, $containerWidth, $tablet);
  }

  // .classes__feature-num
  &__feature-num {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    color: $colorAccent;
    border: 3px solid $colorAccent;
    border-radius: 50%;

    @include adaptiveValue("width", 90, 70, $containerWidth, $tablet);
    @include adaptiveValue("height", 90, 70, $containerWidth, $tablet);
    @include adaptiveValue("font-size", 64, 48, $containerWidth, $tablet);
  }

  // .classes__feature-name
  &__feature-name {
    @include adaptiveValue("font-size", 24, 18, $containerWidth, $tablet);

    font-weight: 700;
  }

  // .classes__feature-text
  &__feature-text {
    line-height: math.div(28, 16);
  }

  // .classes__btn-link
  &__btn-link {
  }
}
</style>
