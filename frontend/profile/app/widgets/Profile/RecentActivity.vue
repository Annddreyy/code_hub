<template>
    <div class="progress-card">
        <div class="progress-card__hdr">
            <h3>Последняя активность</h3>
        </div>
        <div
            v-for="recentActivity in recentActivities"
            :key="recentActivity.id"
            class="action-row"
        >
            <div class="action-row__ico">{{ recentActivity.icon }}</div>
            <div class="action-row__info">
                <div class="action-row__title">{{ recentActivity.title }}</div>
                <div class="action-row__sub">{{ recentActivity.substring }}</div>
            </div>
            <span class="action-row__xp">+{{ recentActivity.xpReward }} XP</span>
            <span class="action-row__time">{{ formatTimeAgo(recentActivity.agoSeconds) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { RecentActivity } from '@/entities/user';

defineProps<{
    recentActivities: RecentActivity[];
}>();

const formatTimeAgo = (seconds: number) => {
    const intervals = [
        { label: 'г', seconds: 31536000 },
        { label: 'мес', seconds: 2592000 },
        { label: 'д', seconds: 86400 },
        { label: 'ч', seconds: 3600 },
        { label: 'мин', seconds: 60 },
        { label: 'с', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label} назад`;
        }
    }

    return 'только что';
};
</script>

<style lang="scss" scoped>
.progress-card {
    border: 1px solid var(--b1);
    border-radius: 14px;

    overflow: hidden;
    background: var(--s1);

    animation: fadeUp 0.4s 0.2s ease both;

    &__hdr {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 15px 18px;

        border-bottom: 1px solid var(--b1);

        h3 {
            font-size: 15px;
            font-weight: 700;
        }
    }
}

.action-row {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 12px 18px;

    border-bottom: 1px solid var(--b1);

    &:last-child {
        border: none;
    }

    &__ico {
        width: 34px;
        height: 34px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        font-size: 16px;

        border-radius: 8px;
    }

    &__info {
        flex: 1;
    }

    &__title {
        margin-bottom: 2px;

        font-size: 13px;
        font-weight: 600;
    }

    &__sub {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__time {
        flex-shrink: 0;

        font-family: var(--spaced);
        font-size: 9px;
        color: var(--dim);
    }

    &__xp {
        flex-shrink: 0;

        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
        color: var(--yellow);
    }
}
</style>
