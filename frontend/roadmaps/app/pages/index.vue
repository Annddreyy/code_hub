<template>
    <main>
        <Hero />
        <Filters
            v-if="filters"
            :filters
        />
        <Stats
            v-if="stats"
            v-bind="stats"
        />
        <SectionWrapper title="В процессе">
            <ActiveRoadmap
                v-if="activeRoadmaps?.[0]"
                v-bind="{ ...activeRoadmaps[0], status: undefined }"
            />
            <RoadmapsCardsGrid
                v-if="activeRoadmaps"
                :roadmaps="activeRoadmaps"
            />
        </SectionWrapper>
        <SectionWrapper title="Завершенные">
            <RoadmapsCardsGrid
                v-if="completedRoadmaps"
                :roadmaps="completedRoadmaps"
            />
        </SectionWrapper>
        <SectionWrapper title="Доступные дорожные карты">
            <RoadmapsCardsGrid
                v-if="newRoadmaps"
                :roadmaps="newRoadmaps"
            />
        </SectionWrapper>
        <SectionWrapper
            v-if="newRoadmaps"
            title="Данные дорожные карты временно недоступны"
        >
            <div class="mini-roadmaps-cards">
                <RoadmapCardMini
                    v-for="roadmap in lockedRoadmaps"
                    :key="roadmap.id"
                    :title="roadmap.title"
                    :icon="roadmap.icon"
                    :xp="roadmap.xp"
                    :current-node="roadmap.currentNode"
                    :total-nodes="roadmap.totalNodes"
                />
            </div>
        </SectionWrapper>
    </main>
</template>

<script setup lang="ts">
import { ActiveRoadmap, Filters, Hero, SectionWrapper, Stats, RoadmapCardMini } from '@/components';
import { roadmapsApi, RoadmapStatus } from '@/api/roadmap';

const [roadmapsResult, filtersResult, statsResult] = await Promise.all([
    useAsyncData(() => roadmapsApi.getRoadmaps()),
    useAsyncData(() => roadmapsApi.getFilters()),
    useAsyncData(() => roadmapsApi.getStats()),
]);

const roadmaps = roadmapsResult.data;
const filters = filtersResult.data;
const stats = statsResult.data;

const activeRoadmaps = roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.ACTIVE);
const completedRoadmaps = roadmaps.value?.filter(
    (roadmap) => roadmap.status === RoadmapStatus.COMPLETED,
);
const newRoadmaps = roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.NEW);
const lockedRoadmaps = roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.LOCKED);

useHead({
    title: 'Дорожные карты',
});
</script>

<style lang="scss" scoped>
main {
    padding: 0 28px;
}

main {
    position: relative;

    height: 100vh;
    padding: 0 28px 32px;

    flex: 1;

    overflow-y: auto;
    z-index: 1;

    .mini-roadmaps-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        padding-bottom: 6px;
        margin-bottom: 24px;

        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s2);
            border-radius: 3px;
        }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s2);
        border-radius: 3px;
    }
}

@media (max-width: 768px) {
    main {
        padding: 0 14px;
    }
}
</style>
