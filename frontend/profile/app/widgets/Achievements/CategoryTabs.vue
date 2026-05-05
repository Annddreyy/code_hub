<template>
    <div class="tabs">
        <div
            :class="['tab', { 'tab--selected': !currentCategory }]"
            @click="$emit('setCategory', undefined)"
        >
            Все ({{ totalAchievements }})
        </div>
        <div
            v-for="category in CATEGORY_TITLES"
            :key="category.title"
            :class="['tab', { 'tab--selected': currentCategory === category.title }]"
            @click="$emit('setCategory', category.title)"
        >
            {{ category.fullTitle }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '@/entities/achievement';
import { CATEGORY_TITLES } from '@/entities/achievement';

defineProps<{
    totalAchievements: number;
    currentCategory: Category | undefined;
}>();

defineEmits<{
    setCategory: [category: Category | undefined];
}>();
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    margin-bottom: 20px;

    .tab {
        padding: 5px 14px;

        font-family: var(--sptabed);
        font-size: 9px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 20px;

        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            color: var(--text);
            border-color: var(--b3);
        }

        &--selected {
            color: var(--purple);
            border-color: var(--purple);
            background: rgba(188, 140, 255, 0.08);
        }
    }
}
</style>
