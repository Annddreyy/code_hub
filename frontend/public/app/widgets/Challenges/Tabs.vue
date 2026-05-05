<template>
    <div class="tabs">
        <button
            :class="['tab', { 'tab--on': !currentDifficulty }]"
            @click="setCurrentDifficulty(undefined)"
        >
            Все
            <span class="tab__count">{{ totalChallengesCount }}</span>
        </button>
        <button
            v-for="difficulty in DIFFICULTY_TITLES"
            :key="difficulty.value"
            :class="['tab', { 'tab--on': currentDifficulty === difficulty.value }]"
            @click="setCurrentDifficulty(difficulty.value)"
        >
            {{ difficulty.titleMany }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { Difficulty } from '@/entities/challenge';
import { DIFFICULTY_TITLES } from '@/entities/challenge';

defineProps<{
    totalChallengesCount: number;
}>();

const emit = defineEmits<{
    setDifficulty: [difficulty: Difficulty | undefined];
}>();

const currentDifficulty = ref<Difficulty | undefined>();

const setCurrentDifficulty = (difficulty: Difficulty | undefined) => {
    currentDifficulty.value = difficulty;
    emit('setDifficulty', difficulty);
};
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    gap: 0;

    padding: 0 28px;

    border-bottom: 1px solid var(--b1);
    background: var(--s1);
}

.tab {
    font-family: var(--sm);
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
    color: var(--muted);

    border: none;
    border-bottom: 2px solid transparent;

    padding: 10px 14px;

    background: none;
    cursor: pointer;

    transition: all 0.15s;

    &__count {
        margin-left: 3px;
        padding: 1px 5px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--blue);

        border-radius: 3px;
        background: rgba(79, 156, 255, 0.1);
    }

    &--on {
        color: var(--blue);
        border-bottom-color: var(--blue);
    }

    &:hover:not(.tab--on) {
        color: var(--text2);
    }
}

@media (max-width: 768px) {
    .tab {
        padding: 10px;
    }
}
</style>
