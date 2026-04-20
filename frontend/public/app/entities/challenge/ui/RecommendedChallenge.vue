<template>
    <div class="challenge">
        <span :class="['challenge__diff', `challenge__diff--${difficulty}`]">
            {{ DIFFICULTY_TITLES.find((diff) => diff.value === difficulty)?.title }}
        </span>
        <span class="challenge__name">{{ title }}</span>
        <span class="challenge__tag">{{ topic }}</span>
        <span class="challenge__xp">+{{ xpReward }} XP</span>
        <button class="challenge__solve">Решить →</button>
    </div>
</template>

<script setup lang="ts">
import type { Challenge } from '../model/challenge';
import { DIFFICULTY_TITLES } from '../model/useChallenges';

defineProps<Challenge>();
</script>

<style lang="scss" scoped>
.challenge {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 9px 0;
    border-bottom: 1px solid var(--b1);

    &:last-child {
        border-bottom: none;
    }

    &__diff {
        width: 56px;
        padding: 2px 6px;
        flex-shrink: 0;

        font-family: var(--sm);
        font-size: 8px;
        font-weight: 700;
        text-align: center;

        border-radius: 3px;

        &--easy {
            color: var(--green);
            border: 1px solid rgba(63, 185, 80, 0.25);
            background: rgba(63, 185, 80, 0.12);
        }

        &--medium {
            color: var(--yellow);
            border: 1px solid rgba(227, 179, 65, 0.25);
            background: rgba(227, 179, 65, 0.12);
        }

        &--hard {
            color: var(--red);
            border: 1px solid rgba(255, 92, 114, 0.25);
            background: rgba(255, 92, 114, 0.12);
        }
    }

    &__name {
        flex: 1;
        font-size: 12px;
        font-weight: 600;
    }

    &__tag {
        padding: 2px 6px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--blue);

        border-radius: 3px;
        background: rgba(79, 156, 255, 0.1);
    }

    &__xp {
        flex-shrink: 0;

        font-family: var(--sm);
        font-size: 9px;
        color: var(--yellow);
    }

    &__solve {
        flex-shrink: 0;
        padding: 4px 10px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--muted);

        border: 1px solid var(--b2);
        border-radius: 5px;

        background: transparent;

        cursor: pointer;
        transition: all 0.15s;

        &:hover {
            color: var(--blue);
            border-color: rgba(79, 156, 255, 0.4);
        }
    }
}

@media (max-width: 768px) {
    .challenge {
        &__tag {
            display: none;
        }
    }
}
</style>
