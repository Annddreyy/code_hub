<template>
    <div class="daily-goal-item">
        <div class="daily-goal-item__icon">{{ icon }}</div>
        <div class="daily-goal-item__value">{{ currentResult }}/{{ goal }}</div>
        <div class="daily-goal-item__title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    icon: string;
    title: string;
    currentResult: number;
    goal: number;
}>();
</script>

<style lang="scss" scoped>
.daily-goal-item {
    text-align: center;

    &__icon {
        margin-bottom: 2px;
        font-size: 13px;
    }

    &__value {
        font-family: var(--sm);
        font-size: 9px;
        color: var(--text2);
    }

    &__title {
        font-family: var(--sm);
        font-size: 7px;
        color: var(--dim);
    }
}
</style>
