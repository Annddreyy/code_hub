<template>
    <main class="dashboard">
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar
                v-if="goals"
                :links="SIDEBAR_LINKS"
                :goals="goals"
            />
        </Teleport>
        <Welcome
            :user-name="currentUser.name"
            :streak="currentUser.streak"
        />
        <Stats
            v-if="stats"
            :stats="stats"
        />
        <div class="dashboard__user-courses">
            <ActiveCourseSection
                v-if="activeCourse"
                :active-course="activeCourse"
            />
            <CourseStrip
                v-if="coursesStore.userCourses.length"
                :user-courses="coursesStore.userCourses.slice(1, SHOWING_USER_COURSES_COUNT)"
            />
        </div>
        <Heatmap
            v-if="heatmapCells"
            :cells="heatmapCells"
        />
        <div class="dashboard__bottom">
            <Challenges
                :challenges="challengesStore.challenges.slice(0, SHOWING_CHALLENGES_COUNT)"
            />
            <Achievements
                v-if="achievements"
                :achievements="achievements.slice(0, SHOWING_ACHIEVEMENTS_COUNT)"
            />
        </div>
    </main>
</template>

<script setup lang="ts">
import { useCoursesStore } from '@/entities/course';
import { userApi, useUserStore } from '@/entities/user';
import { useChallengesStore } from '@/entities/challenge';
import { achievementApi } from '@/entities/achievement';
import { statApi } from '@/entities/stat';

import {
    Welcome,
    Stats,
    Heatmap,
    Achievements,
    ActiveCourseSection,
    Challenges,
    CourseStrip,
    Sidebar,
} from '@/widgets/Dashboard';
import { SIDEBAR_LINKS } from '@/widgets/Dashboard/config';

const SHOWING_CHALLENGES_COUNT = 6;
const SHOWING_ACHIEVEMENTS_COUNT = 10;
const SHOWING_USER_COURSES_COUNT = 3;

const { currentUser } = useUserStore();

const coursesStore = useCoursesStore();
const challengesStore = useChallengesStore();

const isMounted = ref(false);

const [
    _coursesResult,
    statsResult,
    _challengesResult,
    achievementsResult,
    heatmapResult,
    goalsResult,
] = await Promise.all([
    useAsyncData('courses', () => coursesStore.getCourses()),
    useAsyncData('stats', () => statApi.getStats()),
    useAsyncData('challenges', () => challengesStore.getChallenges()),
    useAsyncData('achievements', () => achievementApi.getAchievements()),
    useAsyncData('heatmap', () => userApi.getHeatmap()),
    useAsyncData('dailyGoals', () => statApi.getDayGoal()),
]);

const achievements = achievementsResult.data;
const stats = statsResult.data;
const heatmapCells = heatmapResult.data;
const goals = goalsResult.data;

const activeCourse = computed(() => coursesStore.userCourses[0]);

onMounted(() => {
    isMounted.value = true;
});

useHead({
    title: 'Дашборд',
});
</script>

<style lang="scss" scoped>
.dashboard {
    padding: 28px 28px 48px;
    flex: 1;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: var(--s3);
    }

    &__user-courses,
    &__bottom {
        display: grid;
        gap: 16px;
        margin-bottom: 16px;
    }

    &__user-courses {
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: 16px;
    }

    &__bottom {
        grid-template-columns: 2fr 1fr;
        margin-top: 16px;
    }
}

@media (max-width: 1220px) {
    .dashboard {
        &__user-courses,
        &__bottom {
            grid-template-columns: 1fr;
        }
    }
}

@media (max-width: 768px) {
    .dashboard {
        padding: 14px;
    }
}
</style>
