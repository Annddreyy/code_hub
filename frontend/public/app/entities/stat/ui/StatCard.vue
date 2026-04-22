<template>
    <div class="stats-card">
        <div class="stats-card__top">
            <span class="stats-card__icon">{{ icon }}</span>
            <span
                v-if="userMeta.prevCount"
                class="stats-card__badge"
            >
                +{{ userMeta.currentCount - userMeta.prevCount }} сегодня
            </span>
        </div>
        <div :class="['stats-card__val', `stats-card__val--${color}`]">
            {{ userMeta.currentCount }}
        </div>
        <div class="stats-card__lbl">{{ description }}</div>
    </div>
</template>

<script setup lang="ts">
import type { Stat } from '../model/stat';

defineProps<Stat>();
</script>

<style lang="scss" scoped>
.stats-card {
    padding: 16px;

    background: var(--s1);
    border: 1px solid var(--b1);
    border-radius: 11px;

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 10px;
    }
    &__icon {
        font-size: 18px;
    }

    &__badge {
        padding: 2px 6px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--green);

        border-radius: 3px;
        background: rgba(63, 185, 80, 0.12);
    }

    &__val {
        margin-bottom: 3px;

        font-size: 24px;
        font-weight: 900;
        line-height: 1;

        &--yellow {
            color: var(--yellow);
        }

        &--green {
            color: var(--green);
        }

        &--blue {
            color: var(--blue);
        }

        &--purple {
            color: var(--purple);
        }
    }

    &__lbl {
        font-family: var(--sm);
        font-size: 9px;
        color: var(--muted);
    }
}
</style>
