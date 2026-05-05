<template>
    <section class="achievements-grid">
        <AchievementCard
            v-for="achievement in achievements"
            :key="achievement.id"
            v-bind="achievement"
        />
    </section>
</template>

<script setup lang="ts">
import type { Achievement } from '@/entities/achievement';
import { AchievementCard } from '@/entities/achievement';

defineProps<{
    achievements: Achievement[];
}>();
</script>

<style lang="scss" scoped>
.achievements-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

@media (max-width: 1220px) {
    .achievements-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
}
</style>
