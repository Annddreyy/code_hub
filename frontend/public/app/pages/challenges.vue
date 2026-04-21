<template>
    <main>
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar
                v-if="topics"
                :topics="topics"
                @set-title="updateTitle"
                @set-statuses="updateStatuses"
                @set-topics="updateTopics"
            />
        </Teleport>
        <Hero
            v-if="userStats"
            :user-stats="userStats"
        />
        <Tabs
            :total-challenges-count="challengesStore.challenges.length"
            @set-difficulty="updateDifficulty"
            @set-is-solved="updateIsSolved"
        />
        <div id="searchbar" />
        <div id="topics" />
        <div id="statuses" />
        <ChallengesTable :challenges="challengesStore.challenges" />
        <ChallengesList :challenges="challengesStore.challenges" />
    </main>
</template>

<script setup lang="ts">
import { ChallengesList, ChallengesTable, Hero, Sidebar, Tabs } from '@/widgets/Challenges';
import {
    challengesApi,
    type Difficulty,
    type Filters,
    type Status,
    useChallengesStore,
} from '@/entities/challenge';
import { userApi } from '@/entities/user';

const isMounted = ref(false);

const challengesStore = useChallengesStore();

const filters = ref<Filters>({});

await useAsyncData('challenges', () => challengesStore.getChallenges(filters.value), {
    watch: [filters],
});

const [userStatsResult, topicsResult] = await Promise.all([
    useAsyncData('userStats', () => userApi.getChallengesStatistics()),
    useAsyncData('topics', () => challengesApi.getTopics()),
]);

const userStats = userStatsResult.data;
const topics = topicsResult.data;

onMounted(() => {
    isMounted.value = true;
});

useSeoMeta({
    title: 'Задачи',
});

const updateDifficulty = (difficulty: Difficulty | undefined) => {
    filters.value.difficulty = difficulty;
};

const updateIsSolved = (isSolved: boolean) => {
    filters.value.isSolved = isSolved;
};

const updateTitle = (title?: string) => {
    filters.value.title = title;
};

const updateStatuses = (statuses: Status[]) => {
    filters.value.statuses = statuses;
};

const updateTopics = (topics: string[]) => {
    filters.value.topics = topics;
};
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    flex: 1;

    margin-bottom: 70px;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
        border-radius: 3px;
    }

    #topics,
    #statuses,
    #searchbar {
        display: none;
        padding: 20px 20px 0;
    }
}

@media (max-width: 768px) {
    main {
        #topics,
        #statuses,
        #searchbar {
            display: block;
        }
    }
}
</style>
