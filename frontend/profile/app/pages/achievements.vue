<template>
    <div>
        <AchievementsHero
            v-if="totalAchievements"
            :total-achievements
            :unlocked-achievements
        />
        <CategoryTabs
            v-if="totalAchievements"
            :total-achievements
            :current-category
            @set-category="setCategory"
        />
        <AchievementsGrid
            v-if="achievements"
            :achievements
        />
    </div>
</template>

<script setup lang="ts">
import type { Category } from '@/entities/achievement';
import { achievementsApi } from '@/entities/achievement';
import { AchievementsGrid, AchievementsHero, CategoryTabs } from '@/widgets';

const currentCategory = ref<Category | undefined>(undefined);

const { data: achievements } = await useAsyncData(
    'achievements',
    () => achievementsApi.getAchievements(currentCategory.value),
    { watch: [currentCategory] },
);

const totalAchievements = computed(() => achievements.value?.length);
const unlockedAchievements = computed(
    () => achievements.value?.filter((achievement) => achievement.userMeta.earnedDate).length || 0,
);

const setCategory = (category: Category | undefined) => {
    currentCategory.value = category;
};

useHead({
    title: 'Достижения',
});
</script>
