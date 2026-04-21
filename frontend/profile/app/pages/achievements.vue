<template>
    <div>
        <AchievementsHero
            v-if="totalAchievements && unlockedAchievements"
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
import { achievementsApi, Category } from '@/entities/achievement';
import { AchievementsGrid, AchievementsHero, CategoryTabs } from '@/widgets';

const currentCategory = ref<Category | undefined>(undefined);

const { data: achievements } = await useAsyncData(
    'achievements',
    () => achievementsApi.getAchievements(),
    { watch: [currentCategory] },
);

const totalAchievements = computed(() => achievements.value?.length);
const unlockedAchievements = computed(
    () => achievements.value?.filter((achievement) => achievement.userMeta.earnedDate).length,
);

const setCategory = (category: Category | undefined) => {
    currentCategory.value = category;
}

useHead({
    title: 'Достижения',
});
</script>
