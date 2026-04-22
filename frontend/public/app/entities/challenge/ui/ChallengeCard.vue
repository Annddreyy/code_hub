<template>
    <div :class="['challenge-card', { 'challenge-card--solved': isSolved }]">
        <div class="challenge-card__left">
            <div class="challenge-card__num">#{{ challengeId }}</div>
            <div :class="['challenge-card__name', { 'challenge-card__name--solved': isSolved }]">
                {{ title }}
            </div>
            <div class="challenge-card__tags">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="challenge-card__tag"
                >
                    {{ tag }}
                </span>
            </div>
            <div class="challenge-card__meta">
                <span
                    :class="[
                        'challenge-card__difficulty',
                        `challenge-card__difficulty--${difficulty}`,
                    ]"
                >
                    {{ DIFFICULTY_TITLES.find((diff) => diff.value === difficulty)?.title }}
                </span>
                <span class="challenge-card__accept">{{ accept }}%</span>
            </div>
        </div>
        <div class="challenge-card__right">
            <span class="challenge-card__xp">+{{ xpReward }} XP</span
            ><span class="challenge-card__status">{{ statusIcon }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Challenge } from '../model/challenge';
import { DIFFICULTY_TITLES } from '../model/useChallenges';

const { id, status } = defineProps<Challenge>();

const challengeId = computed(() => String(id).padStart(3, '0'));
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
const isSolved = computed(() => status === 'done');
</script>

<style lang="scss" scoped>
.challenge-card {
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: 8px;
    padding: 13px 14px;

    background: var(--s1);

    border: 1px solid var(--b1);
    border-radius: 11px;

    cursor: pointer;
    transition: border-color 0.15s;

    &--solved {
        border-left: 3px solid var(--green);
    }

    &__left {
        flex: 1;
        min-width: 0;
    }

    &__num {
        margin-bottom: 3px;

        font-family: var(--spaced);
        font-size: 8px;
        color: var(--dim);
    }

    &__name {
        margin-bottom: 4px;

        font-size: 13px;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;

        overflow: hidden;

        &--solved {
            color: var(--green);
        }
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;

        margin-bottom: 5px;
    }

    &__tag {
        padding: 1px 5px;

        font-family: var(--spaced);
        font-size: 7px;
        color: var(--dim);

        border-radius: 3px;
        background: var(--s2);
    }

    &__meta {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__difficulty {
        padding: 2px 6px;

        font-family: var(--spaced);
        font-size: 7px;
        font-weight: 700;

        border-radius: 3px;

        &--easy {
            color: var(--green);
            background: rgba(63, 185, 80, 0.1);
        }

        &--medium {
            color: var(--yellow);
            background: rgba(227, 179, 65, 0.1);
        }

        &--hard {
            color: var(--red);
            background: rgba(255, 92, 114, 0.1);
        }
    }

    &__accept {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;
        flex-shrink: 0;
    }

    &__xp {
        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;
        color: var(--yellow);
    }

    &__status {
        font-size: 16px;
    }
}
</style>
