<template>
    <main>
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar @select-period="selectPeriod" />
        </Teleport>
        <HeroTop
            v-if="leaderboardUsers && leaderboardUsers.length >= 3"
            :first-place="leaderboardUsers[0]!"
            :second-place="leaderboardUsers[1]!"
            :third-place="leaderboardUsers[2]!"
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
import { HeroTop, LeaderboardTable, Paginator, Sidebar } from '@/widgets/Leaderboard';
import { userApi, type LeaderboardPeriod } from '@/entities/user';

const SUBLING_COUNT = 5;

const selectedPeriod = ref<LeaderboardPeriod>('week');
const isMounted = ref(false);

const currentPage = ref(1);

const { data: leaderboardResult } = await useAsyncData(
    'leaderboard',
    () => userApi.getLeaderboardStatistics(currentPage.value),
    { watch: [currentPage] },
);

const leaderboardUsers = leaderboardResult.value?.users;
const totalUsers = leaderboardResult.value?.totalUsers;
const pageSize = leaderboardResult.value?.pageSize;

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
