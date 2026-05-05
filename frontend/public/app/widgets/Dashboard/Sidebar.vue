<template>
    <div class="sidebar">
        <div class="sidebar__lbl">Навигация</div>
        <NuxtLink
            v-for="link in links"
            :key="link.id"
            :to="link.link"
            class="sidebar__link"
        >
            <span class="sidebar__icon">{{ link.icon }}</span>
            {{ link.title }}
        </NuxtLink>
    </div>
    <div class="daily-goal">
        <div class="daily-goal__top">
            <span class="daily-goal__lbl">Дневная цель</span>
            <span class="daily-goal__pct">{{ dayGoal }}%</span>
        </div>
        <div class="daily-goal__bar">
            <div class="daily-goal__fill" />
        </div>
        <div class="daily-goal__items">
            <DailyGoalCard
                v-for="goal in goals"
                :key="goal.title"
                v-bind="goal"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type DailyGoal, DailyGoalCard } from '@/entities/stat';
import type { SidebarLink } from './config';

const { goals } = defineProps<{
    links: SidebarLink[];
    goals: DailyGoal[];
}>();

const dayGoal = computed(() =>
    Math.round(
        goals
            .map((goal) => (goal.currentResult / goal.goal) * 100)
            .reduce((elem, sum) => sum + elem, 0) / goals.length,
    ),
);
</script>

<style lang="scss" scoped>
.sidebar {
    &__lbl {
        margin-bottom: 8px;
        padding: 0 4px;

        font-family: var(--sm);
        font-size: 7px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__link {
        display: flex;
        align-items: center;
        gap: 8px;

        padding: 7px 8px;

        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        color: var(--muted);

        border-radius: 7px;

        cursor: pointer;
        transition: all 0.12s;

        &:hover {
            color: var(--text2);
            background: rgba(255, 255, 255, 0.03);
        }
    }

    &__icon {
        width: 20px;
        flex-shrink: 0;

        font-size: 14px;
        text-align: center;
    }
}

.daily-goal {
    margin: 12px;
    padding: 12px;

    border: 1px solid var(--b1);
    border-radius: 9px;

    background: var(--s2);

    &__top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
    }

    &__lbl {
        font-family: var(--sm);
        font-size: 8px;
        color: var(--muted);
    }

    &__pct {
        font-family: var(--sm);
        font-size: 10px;
        font-weight: 700;
        color: var(--green);
    }

    &__bar {
        height: 4px;

        border-radius: 2px;
        background: var(--s3);
        overflow: hidden;
    }

    &__fill {
        position: relative;

        width: 65%;
        height: 100%;

        border-radius: 2px;
        background: linear-gradient(90deg, var(--green), var(--cyan));
        overflow: hidden;

        &::after {
            position: absolute;
            content: '';

            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);

            animation: shimmer 2s infinite;
        }
    }

    &__items {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }
}
</style>
