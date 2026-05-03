<template>
    <tr class="challenge-row">
        <td class="challenge-row__idx">{{ id }}</td>
        <td class="challenge-row__status">{{ statusIcon }}</td>
        <td class="challenge-row__name">
            <NuxtLink :to="`/challenges/${id}`">{{ title }}</NuxtLink>
            <span class="challenge-row__topic">{{ topicsString }}</span>
        </td>
        <td class="challenge-row__difficulty">
            <span
                :class="[
                    'challenge-row__difficulty-badge',
                    `challenge-row__difficulty-badge--${difficulty}`,
                ]"
            >
                {{ DIFFICULTY_TITLES.find((diff) => diff.value === difficulty)?.title }}
            </span>
        </td>
        <td class="challenge-row__tags">
            <span
                v-for="theme in themes"
                :key="theme"
                class="challenge-row__tag"
            >
                {{ theme }}
            </span>
        </td>
        <td class="challenge-row__acc">{{ accept }}%</td>
        <td class="challenge-row__xp">+{{ xpReward }} XP</td>
        <td class="challenge-row__action">
            <button
                :class="[
                    'challenge-row__solve-btn',
                    { 'challenge-row__solve-btn--solved': userMeta?.solvedAt },
                ]"
            >
                {{ userMeta?.solvedAt ? 'Просмотреть ↩' : 'Решить →' }}
            </button>
        </td>
    </tr>
</template>

<script setup lang="ts">
import type { Challenge } from '../model/challenge';
import { DIFFICULTY_TITLES } from '../model/useChallenges';

const { status, topics } = defineProps<Challenge>();
const statusIcon = computed(() => {
    switch (status) {
        case 'done':
            return '✅';
        case 'in-progress':
            return '⏳';
        default:
            return '·';
    }
});

const topicsString = computed(() => topics?.join(' · '));
</script>

<style lang="scss" scoped>
.challenge-row {
    &__idx {
        width: 36px;
        padding: 12px;

        font-family: var(--sm);
        font-size: 10px;
        text-align: right;
        color: var(--dim);
    }

    &__status {
        width: 28px;
        padding: 12px 8px;

        font-size: 14px;
        text-align: center;
    }

    &__name {
        max-width: 220px;
        padding: 12px 8px;

        :deep(a) {
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            color: var(--text);

            cursor: pointer;

            &:hover {
                color: var(--blue);
            }
        }
    }

    &__topic {
        display: block;
        margin-top: 2px;

        font-family: var(--sm);
        font-size: 9px;
        font-weight: 400;
        color: var(--muted);
    }

    &__difficulty {
        width: 80px;
        padding: 12px 10px;
    }

    &__difficulty-badge {
        display: inline-block;
        padding: 3px 8px;

        font-family: var(--sm);
        font-size: 8px;
        font-weight: 700;

        border-radius: 4px;

        &--easy {
            color: var(--green);
            border: 1px solid rgba(63, 185, 80, 0.2);
            background: rgba(63, 185, 80, 0.1);
        }

        &--medium {
            color: var(--yellow);
            border: 1px solid rgba(227, 179, 65, 0.2);
            background: rgba(227, 179, 65, 0.1);
        }

        &--hard {
            color: var(--red);
            border: 1px solid rgba(255, 92, 114, 0.2);
            background: rgba(255, 92, 114, 0.1);
        }
    }

    &__tags {
        padding: 12px 8px;
    }

    &__tag {
        font-family: var(--sm);
        font-size: 8px;
        padding: 2px 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.04);
        color: var(--dim);
        margin-right: 4px;
        display: inline-block;
    }

    &__xp {
        width: 60px;
        padding: 12px 10px;

        font-family: var(--sm);
        font-size: 10px;
        font-weight: 700;
        text-align: center;
        color: var(--yellow);
    }

    &__action {
        width: 90px;
        padding: 12px;

        text-align: right;
    }

    &__solve-btn {
        padding: 5px 12px;

        font-family: var(--sm);
        font-size: 9px;
        font-weight: 700;
        white-space: nowrap;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 6px;

        background: transparent;
        cursor: pointer;

        transition: all 0.15s;

        &:hover {
            color: var(--blue);
            border-color: rgba(79, 156, 255, 0.4);
        }

        &--solved {
            color: var(--green);
            border-color: rgba(63, 185, 80, 0.3);

            &:hover {
                background: rgba(63, 185, 80, 0.08);
            }
        }
    }

    &__acc {
        width: 70px;
        padding: 12px 10px;

        font-family: var(--sm);
        font-size: 10px;
        text-align: center;
        color: var(--muted);
    }
}

@media (max-width: 1220px) {
    .challenge-row {
        &__action {
            display: none;
        }
    }
}
</style>
