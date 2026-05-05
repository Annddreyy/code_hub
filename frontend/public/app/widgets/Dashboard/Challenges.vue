<template>
    <SectionWrapper
        section-title="Рекомендованные задачи"
        link-title="Смотреть все"
        link="/challenges"
    >
        <RecommendedChallenge
            v-for="challenge in challenges"
            :key="challenge.id"
            v-bind="challenge"
        />
    </SectionWrapper>
</template>

<script setup lang="ts">
import { RecommendedChallenge, type Challenge } from '@/entities/challenge';
import SectionWrapper from './SectionWrapper.vue';

defineProps<{
    challenges: Challenge[];
}>();
</script>
