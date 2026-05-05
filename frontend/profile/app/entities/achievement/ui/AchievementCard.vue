<template>
    <div class="achievement-card achievement-card--unlocked">
        <span :class="['achievement-card__rarity', `achievement-card__rarity--${category}`]">
            {{ CATEGORY_TITLES.find((cat) => cat.title === category)?.fullTitle }}
        </span>
        <span class="achievement-card__ico">{{ icon }}</span>
        <div class="achievement-card__name">{{ title }}</div>
        <div class="achievement-card__desc">{{ description }}</div>
        <span class="achievement-card__xp">+{{ xpReward }} XP</span>
        <span class="achievement-card__lock">🔒 76 / 100 hard solved</span>
    </div>
</template>

<script setup lang="ts">
import { CATEGORY_TITLES, type Achievement } from '../model/achievement';

defineProps<Achievement>();
</script>

<style lang="scss" scoped>
.achievement-card {
    position: relative;
    padding: 18px 14px;

    text-align: center;
    cursor: pointer;

    border: 1px solid var(--b1);
    border-radius: 12px;

    background: var(--s1);
    overflow: hidden;

    transition: all 0.22s;

    &::before {
        position: absolute;
        content: '';

        inset: 0;
        opacity: 0;

        background: radial-gradient(circle at 50% 0%, rgba(188, 140, 255, 0.05), transparent 70%);

        transition: opacity 0.2s;

        &:hover {
            transform: translateY(-2px);
            border-color: var(--b2);

            &::before {
                opacity: 1;
            }
        }
    }

    &--unlocked {
        border-color: rgba(188, 140, 255, 0.3);
        background: rgba(188, 140, 255, 0.03);

        animation: badgePop 0.4s ease;

        &::after {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            right: 0;

            height: 2px;

            background: linear-gradient(90deg, var(--purple), var(--blue));
        }
    }

    &--locked {
        opacity: 0.5;
        filter: grayscale(0.7);
    }

    &__ico {
        display: block;
        margin-bottom: 10px;

        font-size: 36px;
    }

    &__name {
        margin-bottom: 4px;

        font-size: 12px;
        font-weight: 700;
    }

    &__desc {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
        line-height: 1.45;
    }

    &__xp {
        display: block;
        margin-top: 8px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--yellow);
    }

    &__lock {
        display: block;
        margin-top: 6px;

        font-family: var(--spaced);
        font-size: 8px;
        color: var(--dim);
    }

    &__rarity {
        position: absolute;
        top: 8px;
        right: 8px;

        padding: 1px 6px;

        font-family: var(--spaced);
        font-size: 7px;
        font-weight: 700;

        border-radius: 10px;

        &--common {
            color: var(--muted);
            background: rgba(139, 148, 158, 0.1);
        }

        &--rare {
            color: var(--blue);
            background: rgba(79, 156, 255, 0.1);
        }

        &--epic {
            color: var(--purple);
            background: rgba(188, 140, 255, 0.1);
        }

        &--legendary {
            color: var(--yellow);
            background: rgba(227, 179, 65, 0.1);
        }
    }
}
</style>
