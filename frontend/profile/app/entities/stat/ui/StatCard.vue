<template>
    <div class="stat-card">
        <div :class="['stat-card__value', `stat-card__value--${color}`]">{{ value }}</div>
        <div class="stat-card__label">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import type { Stat } from '../model/stat';

defineProps<Stat>();
</script>

<style lang="scss" scoped>
.stat-card {
    padding: 14px;

    text-align: center;

    border: 1px solid var(--b1);
    border-radius: 10px;

    background: var(--s2);

    &__value {
        margin-bottom: 4px;

        font-family: var(--spaced);
        font-size: 20px;
        font-weight: 700;
        line-height: 1;

        &--green {
            color: var(--green);
        }

        &--orange {
            color: var(--orange);
        }

        &--yellow {
            color: var(--yellow);
        }

        &--purple {
            color: var(--purple);
        }

        &--blue {
            color: var(--blue);
        }
    }

    &__label {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }
}

@media (max-width: 768px) {
    .stat-card {
        &__value {
            font-size: 14px;
        }
    }
}
</style>
