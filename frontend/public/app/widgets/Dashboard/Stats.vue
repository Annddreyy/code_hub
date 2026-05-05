<template>
    <div class="stats">
        <StatCard
            v-for="stat in stats"
            :key="stat.id"
            v-bind="stat"
        />
    </div>
</template>

<script setup lang="ts">
import { StatCard, type Stat } from '@/entities/stat';

defineProps<{
    stats: Stat[];
}>();
</script>

<style lang="scss" scoped>
.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    margin-bottom: 24px;

    animation: fadeUp 0.4s 0.05s ease both;
}

@media (max-width: 1220px) {
    .stats {
        gap: 6px;
    }
}

@media (max-width: 768px) {
    .stats {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
