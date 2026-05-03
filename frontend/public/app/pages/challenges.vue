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
            v-if="stats"
            :stats="stats"
        />
        <Tabs
            :total-challenges-count="challengesStore.challenges?.length"
            @set-difficulty="updateDifficulty"
        />
        <div id="searchbar" />
        <div id="topics" />
        <div id="statuses" />
        <ChallengesTable :challenges="challengesStore.challenges" />
        <ChallengesList :challenges="challengesStore.challenges" />
        <Paginator
            :current-page="currentPage"
            :total-pages="totalPages"
            :sibling-count="SUBLING_COUNT"
            @update:current-page="debounceUpdateCurrentPage"
        />
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
import { Paginator } from '@/shared/ui';
import { debounce } from 'lodash';

const SUBLING_COUNT = 5;

const cookieHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

const challengesStore = useChallengesStore();

const isMounted = ref(false);
const filters = ref<Filters>({});
const currentPage = ref(1);

const { data } = await useAsyncData(
    'challenges',
    () => challengesStore.getChallenges(filters.value, cookieHeaders),
    {
        watch: [filters],
        deep: true,
    },
);

const totalPages = computed(() => {
    if (!data.value) {
        return 0;
    }
    return Math.ceil(data.value.totalCount / data.value.pageSize);
});

const [topicsResult, statsResult] = await Promise.all([
    useAsyncData('topics', () => challengesApi.getTopics(cookieHeaders)),
    useAsyncData('stats', () => challengesApi.getStats(cookieHeaders)),
]);

const topics = topicsResult.data;
const stats = statsResult.data;

onMounted(() => {
    isMounted.value = true;
});

useSeoMeta({
    title: 'Задачи',
});

const updateCurrentPage = (page: number) => {
    currentPage.value = page;
    filters.value = {
        ...filters.value,
        page,
    };
};

const debounceUpdateCurrentPage = debounce(updateCurrentPage, 500);

const updateDifficulty = (difficulty: Difficulty | undefined) => {
    currentPage.value = 1;
    filters.value = {
        ...filters.value,
        difficulty,
        page: currentPage.value,
    };
};

const updateTitle = (title?: string) => {
    currentPage.value = 1;
    filters.value = {
        ...filters.value,
        title,
        page: currentPage.value,
    };
};

const updateStatuses = (statuses: Status[]) => {
    currentPage.value = 1;
    filters.value = {
        ...filters.value,
        statuses,
        page: currentPage.value,
    };
};

const updateTopics = (topics: string[]) => {
    currentPage.value = 1;
    filters.value = {
        ...filters.value,
        topics,
        page: currentPage.value,
    };
};
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    flex: 1;

    margin-bottom: 50px;

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
