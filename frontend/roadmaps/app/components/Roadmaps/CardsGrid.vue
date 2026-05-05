<template>
    <div class="card-grid">
        <RoadmapCard
            v-for="roadmap in roadmaps"
            :key="roadmap.id"
            v-bind="roadmap"
        />
    </div>
</template>

<script setup lang="ts">
import type { Roadmap } from '@/api/roadmap';
import RoadmapCard from './RoadmapCard.vue';

defineProps<{
    roadmaps: Roadmap[];
}>();
</script>

<style lang="scss" scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;

    margin-bottom: 24px;
}

@media (max-width: 1220px) {
    .card-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
</style>
