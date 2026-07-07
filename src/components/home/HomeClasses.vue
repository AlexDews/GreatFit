<script setup>
import AppTitle from "@/components/ui/AppTitle.vue";
import AppTabs from "@modules/tabs/AppTabs.vue";
import AppPicture from "@/components/ui/AppPicture.vue";
import AppButton from "@/components/ui/AppButton.vue";

const classItems = [
  {
    id: "beginners",
    title: "Beginners Yoga",
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
  <section class="main__classes classes">
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
                    alt="item.title"
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
              <AppButton class="classes__btn-link">Get Your Free Trial</AppButton>
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
    gap: 48px;
  }

  // .classes__item
  &__item {
    display: flex;
    gap: 48px;
  }

  // .classes__image
  &__image {
  }

  // .classes__img
  &__img {
  }

  // .classes__info
  &__info {
  }

  // .classes__info-title
  &__info-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  // .classes__info-text
  &__info-text {
    line-height: math.div(28, 16);
    margin-bottom: 48px;
  }

  // .classes__features
  &__features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 48px;
  }

  // .classes__feature
  &__feature {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  // .classes__feature-num
  &__feature-num {
    display: flex;
    width: 90px;
    height: 90px;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    font-weight: 300;
    color: $colorAccent;
    border: 3px solid $colorAccent;
    border-radius: 50%;
  }

  // .classes__feature-name
  &__feature-name {
    font-size: 24px;
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
