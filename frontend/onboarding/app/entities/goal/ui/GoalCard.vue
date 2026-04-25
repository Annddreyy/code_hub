<template>
    <div
        :class="['goal', { 'goal--selected': isSelected }]"
        @click="toggleSelect"
    >
        <div class="checkmark">✓</div>
        <span class="goal__icon">{{ icon }}</span>
        <div class="goal__body">
            <div class="goal__title">{{ title }}</div>
            <div class="goal__description">{{ description }}</div>
        </div>
        <div class="goal__tag">{{ tag }}</div>
    </div>
</template>

<script setup lang="ts">
import type { Goal } from '../model/goal';

const props = defineProps<Goal>();
const emit = defineEmits<{
    select: [id: Goal];
    deselect: [id: Goal];
}>();

const isSelected = ref(false);

const toggleSelect = () => {
    if (!isSelected.value) {
        emit('select', props);
    } else {
        emit('deselect', props);
    }
    isSelected.value = !isSelected.value;
};
</script>

<style lang="scss" scoped>
.goal {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 14px 16px;

    border: 1px solid var(--b2);
    border-radius: 10px;

    background: var(--s1);

    cursor: pointer;
    transition: all 0.18s;
    user-select: none;

    &__icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    &__body {
        flex: 1;
    }

    &__title {
        margin-bottom: 2px;

        font-size: 13px;
        font-weight: 700;
    }

    &__description {
        font-size: 11px;
        color: var(--muted);
    }

    &__tag {
        margin-left: auto;
        padding: 4px 7px;
        flex-shrink: 0;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--orange);

        border-radius: 3px;
        background: rgba(255, 140, 66, 0.12);
    }

    .checkmark {
        width: 18px;
        height: 18px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        border: 1px solid var(--b2);
        border-radius: 5px;

        font-size: 9px;

        transition: all 0.18s;
    }

    &--selected {
        border-color: var(--orange);
        background: rgba(255, 140, 66, 0.06);

        .checkmark {
            color: #000;
            border-color: var(--orange);
            background: var(--orange);
        }
    }
}
</style>
