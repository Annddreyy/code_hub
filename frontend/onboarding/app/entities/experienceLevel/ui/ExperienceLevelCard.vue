<template>
    <div
        :class="['level-card', { 'level-card--selected': isSelected }]"
        @click="toggleSelect"
    >
        <div class="checkmark">✓</div>
        <span class="level-card__icon">{{ icon }}</span>
        <div class="level-card__body">
            <div class="level-card__title">{{ title }}</div>
            <div class="level-card__description">{{ description }}</div>
            <div class="level-card__bars">
                <div
                    v-for="(_, index) in 5"
                    :key="index"
                    :class="['level-card__bar', { 'level-card__bar--fill': index < difficulty }]"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ExperienceLevel } from '../model/experienceLevel';

const props = defineProps<ExperienceLevel>();
const emit = defineEmits<{
    select: [id: ExperienceLevel];
    deselect: [id: ExperienceLevel];
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
.level-card {
    position: relative;
    padding: 20px 20px 16px;

    display: flex;
    align-items: flex-start;
    gap: 14px;

    border: 1px solid var(--b2);
    border-radius: 10px;

    user-select: none;
    background: var(--s1);

    cursor: pointer;
    transition: all 0.18s;

    &:hover {
        border-color: var(--b3);
        transform: translateY(-2px);
    }

    &__icon {
        width: 34px;
        margin-top: 2px;
        flex-shrink: 0;

        font-size: 26px;
    }

    &__body {
        flex: 1;
    }

    &__title {
        margin-bottom: 3px;

        font-size: 14px;
        font-weight: 700;
    }

    &__description {
        margin-bottom: 8px;

        font-size: 12px;
        line-height: 1.5;
        color: var(--muted);
    }

    &__bars {
        display: flex;
        gap: 3px;
    }

    &__bar {
        height: 4px;
        flex: 1;

        border-radius: 2px;
        background: var(--s3);

        &--fill {
            background: var(--purple);
        }
    }

    .checkmark {
        position: absolute;
        top: 14px;
        right: 14px;

        display: none;
        width: 20px;
        height: 20px;

        align-items: center;
        justify-content: center;

        font-size: 10px;
        color: #fff;

        border-radius: 50%;
        background: var(--purple);
    }

    &--selected {
        border-color: var(--purple);
        background: rgba(188, 140, 255, 0.06);

        .checkmark {
            display: flex;
            animation: checkPop 0.3s ease;
        }
    }
}
</style>
