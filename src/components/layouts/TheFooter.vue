<script setup></script>

<template>
  <footer class="footer ptb">
    <div class="footer__container">
      <div class="footer__body">
        <div class="footer__header">
          <div class="logo footer__logo">
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
          <nav class="nav footer__nav">
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
            </RouterLink>
            <RouterLink
              to="/"
              class="nav__link"
            >
              Our Facility
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
        </div>
        <div class="footer__center"></div>
        <div class="footer__footer">
          <div class="footer__social">
            <a
              href="/"
              alt="X"
              class="footer__icon"
            >
              <svg class="footer__x"><use href="/images/sprite/sprite.svg#--icon-x"></use></svg>
            </a>
            <a
              href="/"
              alt="YT"
              class="footer__icon"
            >
              <svg class="footer__yt"><use href="/images/sprite/sprite.svg#--icon-yt"></use></svg>
            </a>
          </div>
          <div class="footer__copy">
            <svg class="footer__copy-icon"><use href="/images/sprite/sprite.svg#--icon-copy"></use></svg>
            Copyright 2024 | All rights Reserved
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  // .footer__container
  &__container {
  }

  // .footer__body
  &__body {
    display: flex;
    flex-direction: column;
  }

  // .footer__header
  &__header {
    display: flex;
    justify-content: space-between;
  }

  // .footer__logo
  &__logo {
  }

  // .footer__nav
  &__nav {
  }

  // .footer__center
  &__center {
    width: 100%;
    height: 1px;
    background-color: $fontMainColor;
    margin: 25px 0;
  }

  // .footer__footer
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width:$mobileSmall){
       flex-direction: column;
       gap: 20px; 
    }
  }

  // .footer__social
  &__social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    @media (max-width:$mobileSmall){
       gap: 30px; 
    }
  }

  // .footer__icon
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 5px;
    fill: $fontColor;
    transition:
      background-color 0.3s ease 0s,
      fill 0.3s ease 0s;

    @media (any-hover: hover) {
      &:hover {
        background-color: $colorAccent;
        fill: #fff;
      }
    }
  }

  // .footer__x
  &__x {
    width: 20px;
    height: 20px;
  }

  // .footer__yt
  &__yt {
    width: 20px;
    height: 20px;
  }

  // .footer__copy
  &__copy {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    color: #000;

    @media (max-width:$mobileSmall){
       font-weight: 400;
       font-size: 12px;
    }
  }

  // .footer__copy-icon
  &__copy-icon {
    fill: $colorAccent;
    width: 16px;
    height: 16px;
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

  // .logo__accent
  &__accent {
    font-size: 24px;
    color: $colorAccent;
    font-weight: 700;
  }

  // .logo__subtext
  &__subtext {
    display: flex;
    font-size: 12px;
    font-weight: 500;
    margin-top: -5px;
  }
}
.nav {
  display: flex;
  align-items: center;

  @include adaptiveValue("gap", 35, 10);

  @media (max-width: $mobile) {
    flex-direction: column;
    align-items: end;
  }

  // .nav__link
  &__link {
    position: relative;
    display: inline-flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    font-family: Inter, sans-serif;
    font-weight: 500;
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
}
</style>
