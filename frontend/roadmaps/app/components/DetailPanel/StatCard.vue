<template>
    <div class="stat-card">
        <div :class="`stat-card__value stat-card__value--${valueColor}`">{{ value }}</div>
        <div class="stat-card__label">{{ label }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    value: number;
    valueColor: 'blue' | 'orange' | 'yellow' | 'gray';
    label: string;
}>();
</script>

<style lang="scss" scoped>
.stat-card {
    padding: 10px 12px;

    text-align: center;

    border: 1px solid var(--b1);
    border-radius: 8px;

    background: var(--s2);

    &__value {
        margin-bottom: 2px;

        font-family: var(--spaced);
        font-size: 16px;
        font-weight: 700;

        &--blue {
            color: var(--blue);
        }

        &--orange {
            color: var(--orange);
        }

        &--yellow {
            color: var(--yellow);
        }

        &--gray {
            color: var(--gray);
        }
    }

    &__label {
        font-family: var(--spaced);
        font-size: 7px;
        color: var(--muted);
    }
}
</style>
