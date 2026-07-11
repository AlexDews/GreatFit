<script setup>
import AppTitle from "@/components/ui/AppTitle.vue";
import AppPicture from "@/components/ui/AppPicture.vue";
import AppButton from "@/components/ui/AppButton.vue";

const classTeams = [
  {
    name: "Mark Andersson",
    image: "team-1",
    position: "Lead Yoga Instructor",
    id: "mark-andersson",
  },
  {
    name: "Julia Hurp",
    image: "team-2",
    position: "Yoga Instructor",
    id: "julia-hurp",
  },
  {
    name: "William Grok",
    image: "team-3",
    position: "Studio Manager",
    id: "william-grok",
  },
  {
    name: "Alisa Milova",
    image: "team-4",
    position: "Front Desk Lead",
    id: "alisa-milova",
  },
  {
    name: "Andry Middleson",
    image: "team-5",
    position: "Bodywork",
    id: "andry-middleson",
  },
  {
    name: "Alivia Carter",
    image: "team-6",
    position: "Substitute Teacher",
    id: "alivia-carter",
  },
];
</script>

<template>
  <section class="main__team team ptb">
    <div class="team__container">
      <AppTitle
        title="Our Great Team"
        subtitle="Sub heading to explain more"
      />
      <p class="team__text">
        Meet our team of expert trainers, dedicated to guiding you on your wellness journey. With extensive experience
        and a deep understanding of yoga and fitness, our trainers offer personalized attention to help you reach your
        goals. They are committed to creating a safe and supportive environment, ensuring you feel confident and
        motivated. Join us to experience the passion and expertise of our trainers. Transform your practice and achieve
        your wellness aspirations with us.
      </p>
      <div class="team__body">
        <div class="team__items">
          <RouterLink
            v-for="(team, index) in classTeams"
            :key="index"
            class="team__item"
            :to="`/team/${team.id}`"
          >
            <AppPicture
              class="team__img"
              :name="team.image"
              :alt="team.name"
              loading="lazy"
              @contextmenu.prevent
            />
            <div class="team__bg">
              <div class="team__name">{{ team.name }}</div>
              <div class="team__position">{{ team.position }}</div>
            </div>
          </RouterLink>
        </div>
        <AppButton
          to="/"
          class="team__btn-link"
        >
          Learn More About Us
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.main {
  // .main__team
  &__team {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }
}
.team {
  // .team__container
  &__container {
  }

  // .team__text
  &__text {
    line-height: math.div(28, 16);
    text-align: center;
    margin-bottom: 48px;
  }

  // .team__body
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  // .team__items
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
    margin-bottom: 48px;
    width: 100%;
    justify-items: center;
  }

  // .team__item
  &__item {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 15px;
    overflow: hidden;
    max-width: 408px;

    @media (any-hover: hover) {
      &:hover {
        .team__bg {
          transform: translateY(0);
        }
      }
    }
  }

  // .team__img
  :deep(.team__img) {
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }

  // .team__bg
  &__bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 75%);
    transform: translateY(-100%);
    transition: transform 0.3s ease 0s;
    pointer-events: none;

    @media (max-width: $tablet) {
      @include adaptiveValue("top", 200, 150);

      left: 0;
      transform: translateY(0);
      height: 100px;
    }
  }

  // .team__name
  &__name {
    display: flex;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
  }

  // .team__position
  &__position {
    display: flex;
    color: #fff;
  }

  // .team__btn-link
  &__btn-link {
  }
}
</style>
