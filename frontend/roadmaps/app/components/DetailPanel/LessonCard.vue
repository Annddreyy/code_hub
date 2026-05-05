<template>
    <div :class="`lesson-card lesson-card--${status}`">
        <div class="lesson-card__ico">{{ icon }}</div>
        <div class="lesson-card__info">
            <div class="lesson-card__title">{{ title }}</div>
            <div class="lesson-card__sub">
                <template v-if="status === NodeStatus.DONE">
                    Пройдено · +{{ xpReward }} XP
                </template>
                <template v-else-if="status === NodeStatus.ACTIVE">
                    Продолжить
                    <span class="lesson-card__arrow">→</span>
                </template>
                <template v-else> Закрыто </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NodeStatus } from '@/api';

const { status, xpReward = 0 } = defineProps<{
    title: string;
    status: NodeStatus;
    xpReward?: number;
}>();

const icon = computed(() => {
    switch (status) {
        case NodeStatus.ACTIVE:
            return '▶️';
        case NodeStatus.DONE:
            return '✅';
        default:
            return '🔒';
    }
});
</script>

<style lang="scss" scoped>
.lesson-card {
    margin-bottom: 5px;
    padding: 9px 12px;

    display: flex;
    align-items: center;
    gap: 10px;

    border: 1px solid var(--b1);
    border-radius: 8px;

    background: var(--s2);
    cursor: pointer;

    transition: all 0.15s;

    &:hover {
        border-color: var(--b2);
        background: var(--s3);
    }

    &__ico {
        flex-shrink: 0;
        font-size: 14px;
    }

    &__info {
        flex: 1;
        min-width: 0;
    }

    &__title {
        margin-bottom: 1px;

        font-size: 12px;
        font-weight: 600;
    }

    &__sub {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }

    &__arrow {
        font-size: 12px;
        color: var(--muted);
    }

    &--active {
        border-color: rgba(79, 156, 255, 0.3);
        background: rgba(79, 156, 255, 0.05);
    }

    &--locked {
        opacity: 0.5;
    }
}
</style>
