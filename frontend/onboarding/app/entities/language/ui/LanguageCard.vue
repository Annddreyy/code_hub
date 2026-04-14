<template>
    <div
        :class="['language-card', { 'language-card--selected': isSelected }]"
        @click="toggleSelect"
    >
        <div class="checkmark">✓</div>
        <img
            class="language-card__icon"
            :src="icon"
            alt=""
        />
        <div class="language-card__title">{{ title }}</div>
        <div class="language-card__areas">{{ usageAreasString }}</div>
    </div>
</template>

<script setup lang="ts">
import type { Language } from '../model/language';

const props = defineProps<Language>();
const emit = defineEmits<{
    select: [id: Language];
    deselect: [id: Language];
}>();

const isSelected = ref(false);
const usageAreasString = computed(() => props.usageAreas.join(' · '));

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
.language-card {
    position: relative;
    padding: 16px;

    text-align: center;

    border: 1px solid var(--b2);
    border-radius: 10px;

    user-select: none;
    background: var(--s1);

    cursor: pointer;
    transition: all 0.18s;

    &:hover {
        border-color: var(--b3);
        background: var(--s2);
        transform: translateY(-2px);
    }

    &__icon {
        width: 34px;
        height: 34px;
        margin-bottom: 8px;

        font-size: 28px;
    }

    &__title {
        margin-bottom: 3px;

        font-size: 13px;
        font-weight: 700;
    }

    &__areas {
        font-family: var(--sm);
        font-size: 10px;
        line-height: 1.4;
        color: var(--muted);
    }

    .checkmark {
        display: none;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 8px;
        right: 8px;

        width: 18px;
        height: 18px;

        font-size: 9px;
        color: #fff;

        border-radius: 50%;
        background: var(--blue);
    }

    &--selected {
        border-color: var(--blue);
        background: rgba(79, 156, 255, 0.08);

        .checkmark {
            display: flex;
            animation: checkPop 0.3s ease;
        }
    }
}
</style>
