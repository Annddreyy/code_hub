<template>
    <section class="challenges-list">
        <ChallengeCard
            v-for="challenge in challenges"
            :key="challenge.id"
            v-bind="challenge"
        />
    </section>
</template>

<script setup lang="ts">
import { ChallengeCard, type Challenge } from '@/entities/challenge';

defineProps<{
    challenges: Challenge[];
}>();
</script>

<style lang="scss" scoped>
.challenges-list {
    position: relative;

    display: none;
    margin: 20px 0 52px 0;
    padding: 0 14px 68px;

    flex: 1;

    overflow-y: auto;
    z-index: 1;

    &::-webkit-scrollbar {
        display: none;
    }
}

@media (max-width: 768px) {
    .challenges-list {
        display: block;
    }
}
</style>
