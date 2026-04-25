<template>
    <div class="roadmap">
        <div class="roadmap__icon">{{ icon }}</div>
        <div class="roadmap__title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
import type { Roadmap } from '../model/roadmap';

defineProps<Roadmap>();
</script>

<style lang="scss" scoped>
.roadmap {
    padding: 14px;

    text-align: center;

    border: 1px solid var(--b1);
    border-radius: 10px;
    background: var(--s2);

    &__icon {
        margin-bottom: 6px;

        font-size: 22px;
    }

    &__title {
        margin-bottom: 2px;

        font-size: 12px;
        font-weight: 700;
    }
}
</style>
