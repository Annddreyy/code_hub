<template>
    <main>
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar @select-period="selectPeriod" />
        </Teleport>
        <HeroTop
            v-if="podiumUsers"
            :first-place="podiumUsers[0]!"
            :second-place="podiumUsers[1]!"
            :third-place="podiumUsers[2]!"
        />
        <div id="time-period" />
        <LeaderboardTable
            v-if="leaderboardUsers && pageSize && totalUsers"
            :leaderboard-users="leaderboardUsers"
            :period="selectedPeriod"
            :current-page="currentPage"
            :page-size="pageSize"
            :total-users="totalUsers"
        />
        <Paginator
            :current-page="currentPage"
            :total-pages="totalPages"
            :sibling-count="SUBLING_COUNT"
            @update:current-page="(page: number) => (currentPage = page)"
        />
    </main>
</template>

<script setup lang="ts">
import { HeroTop, LeaderboardTable, Sidebar } from '@/widgets/Leaderboard';
import { userApi, type LeaderboardPeriod } from '@/entities/user';
import { Paginator } from '@/shared/ui';

const SUBLING_COUNT = 5;

const selectedPeriod = ref<LeaderboardPeriod>('week');
const isMounted = ref(false);

const currentPage = ref(1);

const { data: leaderboardResult } = await useAsyncData(
    'leaderboard',
    () => userApi.getLeaderboardStatistics(currentPage.value, 'all'),
    { watch: [currentPage] },
);

const { data: podiumResult } = await useAsyncData('podium', () => userApi.getPodiumUsers('all'));

const leaderboardUsers = leaderboardResult.value?.users;
const totalUsers = leaderboardResult.value?.totalCount;
const pageSize = leaderboardResult.value?.pageSize;

const podiumUsers = podiumResult.value;

console.log(podiumResult);

const totalPages = computed(() => (totalUsers && pageSize ? Math.ceil(totalUsers / pageSize) : 0));

onMounted(() => {
    isMounted.value = true;
});

const selectPeriod = (period: LeaderboardPeriod) => {
    selectedPeriod.value = period;
};

useHead({
    title: 'Таблица лидеров',
});
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    flex: 1;

    overflow: hidden;
}
</style>
