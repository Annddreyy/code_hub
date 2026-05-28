<template>
    <div>
        <ProfileHero
            v-if="user"
            :user
        />
        <div class="profile-section">
            <RecentActivity
                v-if="recentActivities"
                :recent-activities
            />
        </div>
        <Heatmap
            v-if="cells"
            :cells
        />
    </div>
</template>

<script setup lang="ts">
import { Heatmap, ProfileHero, RecentActivity } from '@/widgets';
import { userApi, useUserStore } from '@/entities/user';

const { user } = useUserStore();

const [cellsResult, recentActivitiesResult] = await Promise.all([
    useAsyncData(() => userApi.getHeatmap()),
    useAsyncData(() => userApi.getRecentActivity()),
]);

const cells = cellsResult.data;
const recentActivities = recentActivitiesResult.data;

useHead({
    title: 'Профиль',
});
</script>

<style lang="scss" scoped>
.profile-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    margin-bottom: 30px;
}

@media (max-width: 1220px) {
    .profile-section {
        grid-template-columns: 1fr;
    }
}
</style>
