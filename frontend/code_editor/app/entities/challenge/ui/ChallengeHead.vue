<template>
    <div class="challenge-head">
        <div class="challenge-head__num">Х{{ taskId }} · {{ topicsString }}</div>
        <div class="challenge-head__title">{{ title }}</div>
        <div class="challenge-head__tags">
            <span
                v-for="tag in tags"
                :key="tag"
                class="challenge-head__tag"
            >
                {{ tag }}
            </span>
            <span class="challenge-head__tag challenge-head__tag--green">
                {{ difficulty }}
            </span>
            <span class="challenge-head__tag challenge-head__tag--yellow">
                +{{ xpReward }} XP
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Challenge } from '../model/challenge';

const { id, topics } = defineProps<Omit<Challenge, 'tests' | 'descriptionMD'>>();

const taskId = computed(() => String(id).padStart(3, '0'));
const topicsString = computed(() => topics.join(' · '));
</script>

<style lang="scss" scoped>
.challenge-head {
    position: sticky;
    top: 0;
    left: 0;
    flex-shrink: 0;
    padding: 16px 20px 12px;

    border-bottom: 1px solid var(--b1);
    background: var(--s1);

    z-index: 1;

    &__num {
        margin-bottom: 4px;

        font-family: var(--spaced);
        font-size: 9px;
        color: var(--dim);
    }

    &__title {
        margin-bottom: 8px;

        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.02em;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }

    &__tag {
        padding: 2px 7px;

        font-family: var(--spaced);
        font-size: 7px;
        font-weight: 700;
        color: var(--muted);

        border: 1px solid var(--b1);
        border-radius: 3px;

        background: var(--s2);

        &--green {
            color: var(--green);
            border-color: rgba(63, 185, 80, 0.25);
        }

        &--yellow {
            color: var(--yellow);
            border-color: rgba(227, 179, 65, 0.25);
        }
    }
}
</style>
