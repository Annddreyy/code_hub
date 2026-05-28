<template>
    <main>
        <Hero />
        <Tags
            v-if="tags"
            :tags
            @select-tag="(value: string | null) => (tag = value)"
        />
        <Stats
            v-if="stats"
            v-bind="stats"
        />
        <SectionWrapper
            v-if="activeRoadmaps?.[0]"
            title="В процессе"
        >
            <ActiveRoadmap v-bind="{ ...activeRoadmaps[0], status: undefined }" />
            <RoadmapsCardsGrid
                v-if="activeRoadmaps?.slice(1).length"
                :roadmaps="activeRoadmaps.slice(1)"
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
                    :completed-lessons="roadmap.completedLessons"
                    :total-lessons="roadmap.totalLessons"
                />
            </div>
        </SectionWrapper>
    </main>
</template>

<script setup lang="ts">
import { ActiveRoadmap, Tags, Hero, SectionWrapper, Stats, RoadmapCardMini } from '@/components';
import { roadmapsApi, RoadmapStatus } from '@/api/roadmap';

const cookieHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

const search = ref('');
const tag = ref<string | null>(null);

const [roadmapsResult, tagsResult] = await Promise.all([
    useAsyncData(() => roadmapsApi.getRoadmaps(search.value, tag.value, cookieHeaders), {
        watch: [search, tag],
        immediate: true,
    }),
    useAsyncData(() => roadmapsApi.getTags(cookieHeaders)),
]);

const roadmaps = roadmapsResult.data;
const tags = tagsResult.data;

const activeRoadmaps = computed(() =>
    roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.ACTIVE),
);

const completedRoadmaps = computed(() =>
    roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.COMPLETED),
);

const newRoadmaps = computed(() =>
    roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.NEW),
);

const lockedRoadmaps = computed(() =>
    roadmaps.value?.filter((roadmap) => roadmap.status === RoadmapStatus.LOCKED),
);

const stats = computed(() => ({
    roadmapsCount: roadmaps.value?.length,
    inProgressCount: activeRoadmaps.value?.length,
    completedCount: completedRoadmaps.value?.length,
    xpEarned: roadmaps.value?.reduce((sum, roadmap) => sum + roadmap.xp, 0),
    nodesCompleted: roadmaps.value?.reduce((sum, roadmap) => sum + roadmap.completedLessons, 0),
}));

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
