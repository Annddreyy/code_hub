<template>
    <div class="filters">
        <div class="filters__label">// временной период</div>
        <div class="scope-tabs">
            <button
                v-for="timePeriod in TIME_PERIODS"
                :key="timePeriod.title"
                :class="[
                    'scope-tabs__tab',
                    { 'scope-tabs__tab--active': selectedPeriod === timePeriod.title },
                ]"
                @click="selectPeriod(timePeriod.title)"
            >
                {{ timePeriod.description }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LeaderboardPeriod } from '@/entities/user';

const TIME_PERIODS: {
    title: LeaderboardPeriod;
    description: string;
}[] = [
    {
        title: 'week',
        description: 'Неделя',
    },
    {
        title: 'month',
        description: 'Месяц',
    },
    {
        title: 'all',
        description: 'Все время',
    },
];

const emit = defineEmits<{
    selectPeriod: [period: LeaderboardPeriod];
}>();

const selectedPeriod = ref<LeaderboardPeriod>('week');

const selectPeriod = (period: LeaderboardPeriod) => {
    selectedPeriod.value = period;
    emit('selectPeriod', period);
};
</script>

<style lang="scss" scoped>
.filters {
    &__label {
        margin-bottom: 8px;

        font-family: var(--spaced);
        font-size: 7px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__btns {
        margin-bottom: 14px;

        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    &__btn {
        display: flex;
        align-items: center;
        gap: 8px;

        padding: 8px 12px;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        text-align: left;
        color: var(--muted);

        border: 1px solid transparent;
        border-radius: 7px;

        background: transparent;

        cursor: pointer;
        transition: all 0.15s;

        &:hover {
            color: var(--text);
            background: rgba(255, 255, 255, 0.03);
        }

        &--active {
            color: var(--blue);
            border-color: rgba(79, 156, 255, 0.2);
            background: rgba(79, 156, 255, 0.07);
        }
    }

    &__icon {
        width: 18px;

        font-size: 13px;
        text-align: center;
    }

    .scope-tabs {
        display: flex;
        gap: 4px;

        margin-bottom: 14px;

        &__tab {
            padding: 5px 10px;

            font-family: var(--spaced);
            font-size: 9px;
            font-weight: 700;
            color: var(--muted);

            border: 1px solid var(--b2);
            border-radius: 6px;

            background: transparent;

            cursor: pointer;
            transition: all 0.15s;

            &--active {
                color: var(--blue);
                border-color: var(--blue);
                background: rgba(79, 156, 255, 0.07);
            }
        }
    }
}

@media (max-width: 768px) {
    .filters {
        padding: 0 12px;
    }
}
</style>
