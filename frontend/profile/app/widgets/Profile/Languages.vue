_
<template>
    <div class="progress-card">
        <div class="progress-card__hdr">
            <h3>Навыки языков программирования</h3>
        </div>
        <div
            v-for="languageProgress in languagesProgress"
            :key="languageProgress.title"
            class="skill-row"
        >
            <span class="skill-row__ico">{{ languageProgress.icon }}</span>
            <div class="skill-row__info">
                <div class="skill-row__name">{{ languageProgress.title }}</div>
                <div class="skill-row__bar">
                    <div
                        :class="['skill-row__fill', `skill-row__fill--${languageProgress.color}`]"
                        :style="`width: ${languageProgress.progressPercent}%;`"
                    />
                </div>
            </div>
            <span :class="['skill-row__pct', `skill-row__pct--${languageProgress.color}`]">
                {{ languageProgress.progressPercent }}%
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LanguageProgress } from '@/entities/user';

defineProps<{
    languagesProgress: LanguageProgress[];
}>();
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

.skill-row {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 11px 18px;

    border-bottom: 1px solid var(--b1);

    &:last-child {
        border: none;
    }

    &__ico {
        flex-shrink: 0;

        font-size: 18px;
    }

    &__info {
        flex: 1;
    }

    &__name {
        margin-bottom: 4px;

        font-size: 12px;
        font-weight: 700;
    }

    &__bar {
        height: 5px;

        border-radius: 3px;

        background: var(--s3);
        overflow: hidden;
    }

    &__fill {
        height: 100%;

        border-radius: 3px;

        &--green {
            background-color: var(--green);
        }

        &--cyan {
            background-color: var(--cyan);
        }

        &--orange {
            background-color: var(--orange);
        }

        &--blue {
            background-color: var(--blue);
        }
    }

    &__pct {
        flex-shrink: 0;

        font-family: var(--spaced);
        font-size: 10px;
        font-weight: 700;

        &--green {
            color: var(--green);
        }

        &--cyan {
            color: var(--cyan);
        }

        &--orange {
            color: var(--orange);
        }

        &--blue {
            color: var(--blue);
        }
    }
}
</style>
