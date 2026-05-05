<template>
    <SectionWrapper
        section-title="Достижения"
        link-title="Все достижения"
        link="/achievements"
    >
        <div class="badge-grid">
            <AchievementBadge
                v-for="achievement in achievements"
                :key="achievement.id"
                v-bind="achievement"
            />
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">
import { AchievementBadge, type Achievement } from '@/entities/achievement';
import SectionWrapper from './SectionWrapper.vue';

defineProps<{
    achievements: Achievement[];
}>();
</script>

<style lang="scss" scoped>
.badge-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
}

@media (max-width: 768px) {
    .badge-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
