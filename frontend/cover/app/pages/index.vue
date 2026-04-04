<template>
  <header>
    <nav class="nav">
      <NuxtLink
        class="nav__logo"
        to="/"
      >
        <span class="nav__bracket">&lt;</span>
        CodeHub
        <span class="nav__bracket">/&gt;</span>
        <div class="nav__dot"></div>
      </NuxtLink>
      <div class="nav__links-wrapper">
        <div class="nav__links">
          <NuxtLink
            v-for="link in links"
            :key="link.id"
            class="nav__link"
            :to="link.link"
          >
            <span class="nav__icon">{{ link.icon }}</span>
            <span class="nav__title">{{ link.title }}</span>
          </NuxtLink>
        </div>
      </div>
      <div class="nav__right">
        <div class="nav__streak-pill">🔥 7<span class="hide-on-mobile">-day streak</span></div>
        <div class="nav__xp-pill">⚡ 2 480<span class="hide-on-mobile"> XP</span></div>
        <div class="nav__notif-btn center">
          🔔
          <div class="nav__notif-dot" />
        </div>
        <div class="nav__avatar center">A</div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { links } from '@/configs/header';
</script>

<style lang="scss" scoped>
.nav {
  position: sticky;
  top: 0;

  height: var(--nav);
  padding: 0 24px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  gap: 0;

  background: rgba(7, 9, 13, 0.92);
  backdrop-filter: blur(22px);
  border-bottom: 1px solid var(--b1);

  z-index: 200;

  &__logo {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-right: 24px;

    font-family: var(--sm);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    color: var(--text);
  }

  &__bracket {
    color: var(--blue);
  }

  &__dot {
    width: 5px;
    height: 5px;

    background: var(--green);
    border-radius: 50%;

    animation: pulse 2s infinite;
  }

  &__links {
    display: flex;
    gap: 0;

    height: var(--nav);
  }

  &__link {
    display: flex;
    align-items: center;

    padding: 0 14px;

    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    color: var(--muted);

    cursor: pointer;
    border-bottom: 2px solid transparent;

    transition: all 0.15s;

    &:hover {
      color: var(--text2);
    }

    &.router-link-active {
      color: var(--blue);
      border-bottom-color: var(--blue);
    }
  }

  &__right {
    margin-left: auto;

    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__streak-pill,
  &__xp-pill {
    padding: 4px 11px;

    font-family: var(--sm);
    font-size: 10px;
    font-weight: 700;
    border-radius: 20px;
  }

  &__streak-pill {
    color: var(--orange);
    border: 1px solid rgba(255, 140, 66, 0.22);
    background: rgba(255, 140, 66, 0.1);
  }

  &__xp-pill {
    color: var(--yellow);
    background: rgba(227, 179, 65, 0.1);
    border: 1px solid rgba(227, 179, 65, 0.22);
  }

  &__notif-btn {
    position: relative;

    width: 30px;
    height: 30px;

    border: 1px solid var(--b1);
    border-radius: 8px;

    font-size: 14px;

    background: var(--s2);
    cursor: pointer;
  }

  &__notif-dot {
    position: absolute;
    top: 4px;
    right: 4px;

    width: 7px;
    height: 7px;

    border: 2px solid var(--bg);
    border-radius: 50%;

    background: var(--red);
  }

  &__avatar {
    width: 32px;
    height: 32px;

    font-size: 12px;
    font-weight: 700;
    color: #fff;

    border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--purple));

    cursor: pointer;
  }

  &__icon {
    display: none;
  }
}

@media (max-width: 1220px) {
  .nav {
    &__streak-pill,
    &__xp-pill {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .nav {
    height: 48px;

    &__logo {
      font-size: 12px;
      margin-right: 6px;
    }

    &__streak-pill,
    &__xp-pill {
      display: block;
      font-size: 8px;
    }

    &__links-wrapper {
      width: 100vw;

      position: fixed;
      bottom: calc(-100vh + 47px);
      left: 0;

      display: flex;
      justify-content: center;

      background: rgba(7, 9, 13, 1);
    }

    &__links {
      max-width: 390px;

      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    &__link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;

      width: 44px;
      height: 44px;

      border-radius: 4px;

      &.router-link-active {
        background-color: rgba(79, 156, 255, 0.08);
        color: var(--blue);
        border-bottom-color: transparent;
      }
    }

    &__icon {
      display: block;
      font-size: 17px;
    }

    &__title {
      font-size: 6px;
    }

    &__avatar {
      width: 26px;
      height: 26px;

      font-size: 10px;
    }

    &__right {
      gap: 4px;
    }
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
