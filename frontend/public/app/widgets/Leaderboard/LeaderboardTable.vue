<template>
    <div class="table-wrap">
        <div class="table-wrap__controls">
            <div class="table-wrap__header">⚡ Таблица лидеров · {{ periodString }}</div>
            <div class="table-wrap__meta">
                Показаны {{ startUserNumber }}–{{ endUserNumber }} из {{ totalUsers }}
            </div>
        </div>
        <div class="leader-board">
            <div class="leader-board__header">
                <div>Позиция</div>
                <div>Пользователь</div>
                <div>XP</div>
                <div>Решено</div>
                <div>Серия</div>
                <div>Изменение позиции</div>
            </div>
            <div
                v-for="leaderboardUser in leaderboardUsers"
                :key="leaderboardUser.id"
                class="leader-board__row"
            >
                <span class="leader-board__num">{{ leaderboardUser.id }}</span>
                <div class="leader-board__user">
                    <div class="leader-board__avatar">
                        {{ leaderboardUser.name[0] }}
                    </div>
                    <div class="leader-board__user-info">
                        <div class="leader-board__name">{{ leaderboardUser.name }}</div>
                    </div>
                </div>
                <span class="leader-board__xp">{{ leaderboardUser.xpCount }}</span>
                <span class="leader-board__solved">{{ leaderboardUser.solvedChallenges }}</span>
                <span class="leader-board__streak">🔥 {{ leaderboardUser.streak }}</span>
                <span
                    :class="[
                        'leader-board__delta',
                        { 'leader-board__delta--up': leaderboardUser.positionDelta > 0 },
                        { 'leader-board__delta--eq': leaderboardUser.positionDelta === 0 },
                        { 'leader-board__delta--dn': leaderboardUser.positionDelta < 0 },
                    ]"
                >
                    {{ getArrowSymbol(leaderboardUser.positionDelta) }}
                    {{ leaderboardUser.positionDelta }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LeaderboardPeriod, LeaderboardUser } from '@/entities/user';

const COUNT_USERS_ON_PODIUM = 3;

const { period, currentPage, pageSize } = defineProps<{
    period: LeaderboardPeriod;
    leaderboardUsers: LeaderboardUser[];
    totalUsers: number;
    currentPage: number;
    pageSize: number;
}>();

const periodString = computed(() => {
    switch (period) {
        case 'week':
            return 'Неделя';
        case 'month':
            return 'Месяц';
        default:
            return 'Все время';
    }
});

const startUserNumber = computed(() => (currentPage - 1) * pageSize + COUNT_USERS_ON_PODIUM);
const endUserNumber = computed(() => startUserNumber.value + pageSize);

const getArrowSymbol = (delta: number) => {
    if (delta > 0) {
        return '↑';
    } else if (delta === 0) {
        return '-';
    }
    return '↓';
};
</script>

<style lang="scss" scoped>
.table-wrap {
    padding: 0 32px 24px;
    flex: 1;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s2);
    }

    &__controls {
        display: flex;
        align-items: center;
        gap: 10px;

        padding: 16px 0 12px;
    }

    &__header {
        font-size: 15px;
        font-weight: 700;
    }

    &__meta {
        margin-left: auto;

        font-family: var(--spaced);
        font-size: 9px;
        color: var(--dim);
    }
}

.leader-board {
    &__header,
    &__row {
        display: grid;
        grid-template-columns: 52px 1fr 120px 120px 90px 80px;
        gap: 12px;
    }

    &__header {
        align-items: center;
        padding: 9px 14px;

        font-family: var(--spaced);
        font-size: 7px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--dim);

        border-bottom: 1px solid var(--b1);
        border-radius: 10px 10px 0 0;

        background: rgba(255, 255, 255, 0.01);
    }

    &__row {
        align-items: center;
        padding: 11px 14px;

        border-bottom: 1px solid var(--b1);
        border-radius: 4px;

        cursor: pointer;

        transition: background 0.12s;

        &:hover {
            background: rgba(255, 255, 255, 0.02);
        }

        &:last-child {
            border: none;
        }

        &--me {
            border-left: 3px solid var(--blue);
            background: rgba(79, 156, 255, 0.04);
        }
    }

    &__num {
        font-family: var(--spaced);
        font-size: 11px;
        font-weight: 700;
        text-align: center;

        &--me {
            color: var(--blue);
        }
    }

    &__user {
        display: flex;
        align-items: center;
        gap: 10px;

        min-width: 0;
    }

    &__avatar {
        width: 32px;
        height: 32px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        font-size: 13px;
        font-weight: 700;

        border-radius: 50%;
        background: linear-gradient(135deg, var(--blue), var(--purple));
    }

    &__user-info {
        flex: 1;
        min-width: 0;
    }

    &__name {
        margin-bottom: 1px;

        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;

        &--me {
            color: var(--blue);
        }
    }

    &__handle {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }

    &__xp {
        font-family: var(--spaced);
        font-size: 11px;
        font-weight: 700;
        color: var(--yellow);
    }

    &__solved {
        font-family: var(--spaced);
        font-size: 11px;
        color: var(--green);
    }

    &__streak {
        display: flex;
        align-items: center;
        gap: 4px;

        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
        color: var(--orange);
    }

    &__delta {
        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;

        &--up {
            color: var(--green);
        }

        &--eq {
            color: var(--dim);
        }

        &--dn {
            color: var(--red);
        }
    }
}

@media (max-width: 1220px) {
    .leader-board {
        &__header,
        &__row {
            grid-template-columns: 50px 1fr 70px 70px 50px 50px;
        }
    }
}

@media (max-width: 768px) {
    .table-wrap {
        padding: 0 12px 24px;
    }

    .leader-board {
        &__header,
        &__row {
            grid-template-columns: 40px 1fr 50px 50px;
        }

        &__header {
            div {
                &:nth-child(4),
                &:nth-child(5) {
                    display: none;
                }
            }
        }
        &__avatar {
            width: 24px;
            height: 24px;
        }

        &__name {
            font-size: 12px;
        }

        &__streak,
        &__solved {
            display: none;
        }
    }
}
</style>
