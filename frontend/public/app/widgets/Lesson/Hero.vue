<template>
    <section class="hero">
        <h1 class="hero__title">{{ lessonTitle }}</h1>
        <p class="hero__sub">
            {{ description }}
        </p>
        <div class="hero__chips">
            <span
                v-for="tag in tags"
                :key="tag"
                class="chip chip--blue"
            >
                {{ tag }}
            </span>
            <span class="chip chip--green">{{ difficulty }}</span>
        </div>
        <div class="hero__meta">
            <span>⏱ ~{{ duration }} минут на чтение</span>
            <span>📍 Урок {{ currentLesson }} из {{ totalLessons }}</span>
            <span>⚡ +{{ xpReward }} XP по завершении</span>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Difficulty } from '@/entities/challenge';

defineProps<{
    lessonTitle: string;
    description: string;
    tags: string[];
    difficulty: Difficulty;
    xpReward: number;
    duration: number;
    currentLesson: number;
    totalLessons: number;
}>();
</script>

<style lang="scss" scoped>
.hero {
    &__title {
        margin-bottom: 12px;

        font-size: 38px;
        font-weight: 800;
        letter-spacing: -0.025em;
        line-height: 1.1;
    }

    &__sub {
        max-width: 620px;
        margin-bottom: 14px;

        font-size: 15px;
        line-height: 1.65;
        color: var(--muted);
    }

    &__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        margin-bottom: 12px;

        .chip {
            padding: 3px 9px;

            font-family: 'Space Mono', monospace;
            font-size: 9px;
            font-weight: 700;

            border-radius: 4px;

            &--blue {
                color: var(--blue);
                background: var(--blue-dim);
            }

            &--green {
                color: var(--green);
                background: var(--green-dim);
            }
        }
    }

    &__meta {
        display: flex;
        gap: 18px;

        margin-bottom: 32px;
        padding: 14px 0;

        font-family: 'Space Mono', monospace;
        font-size: 10px;
        color: var(--dim);

        border-top: 1px solid var(--b1);
        border-bottom: 1px solid var(--b1);

        span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }
}

@media (max-width: 768px) {
    .hero {
        &__title {
            font-size: 24px;
        }
    }
}
</style>
