<template>
    <div class="hero">
        <div class="hero__lbl">// Задачи_{{ stats.totalCount }}</div>
        <div class="hero__title">Задачи по программированию</div>
        <p class="hero__sub">
            {{ stats.totalCount }} задач от легких до сложных. Решай, Отправляй и Поднимайся по
            таблице лидеров.
        </p>
        <div class="hero__stats">
            <div class="hero__stat">
                <span class="hero__stat-value">{{ stats.totalCount }}</span>
                всего задач
            </div>
            <div class="hero__stat">
                <span class="hero__stat-value">{{ stats.easyCount }}</span> легких
            </div>
            <div class="hero__stat">
                <span class="hero__stat-value">{{ stats.mediumCount }}</span> средних
            </div>
            <div class="hero__stat">
                <span class="hero__stat-value">{{ stats.hardCount }}</span> сложных
            </div>
        </div>
        <div class="user-progress">
            <div class="user-progress__card">
                <div class="user-progress__val user-progress__val--green">
                    {{ stats.completedCount }}
                </div>
                <div class="user-progress__lbl">Решено</div>
            </div>
            <div class="user-progress__card">
                <div class="user-progress__val user-progress__val--yellow">
                    {{ stats.pendingCount }}
                </div>
                <div class="user-progress__lbl">Попытки</div>
            </div>
            <div class="user-progress__card">
                <div class="user-progress__val user-progress__val--blue">
                    {{ stats.completionPercentage }}%
                </div>
                <div class="user-progress__lbl">Завершено</div>
            </div>
            <div class="user-progress__card">
                <div class="user-progress__val user-progress__val--orange">{{ 12 }}%</div>
                <div class="user-progress__lbl">Принято</div>
            </div>
            <div class="user-progress__card">
                <div class="user-progress__val user-progress__val--purple">#{{ 243 }}</div>
                <div class="user-progress__lbl">Место в мире</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { StatsResponse } from '@/entities/challenge';

defineProps<{
    stats: StatsResponse;
}>();
</script>

<style lang="scss" scoped>
.hero {
    padding: 24px 28px 16px;

    border-bottom: 1px solid var(--b1);
    background: linear-gradient(180deg, rgba(255, 92, 114, 0.03) 0%, transparent 100%);

    animation: fadeUp 0.4s ease both;

    &__lbl {
        margin-bottom: 5px;

        font-family: var(--sm);
        font-size: 9px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--red);
    }

    &__title {
        margin-bottom: 5px;

        font-size: 28px;
        font-weight: 900;
        letter-spacing: -0.02em;
    }

    &__sub {
        margin-bottom: 12px;

        font-size: 13px;
        color: var(--muted);
    }

    &__stats {
        display: flex;
        gap: 16px;
    }

    &__stat {
        display: flex;
        align-items: center;
        gap: 5px;

        font-family: var(--sm);
        font-size: 10px;
        color: var(--muted);
    }

    &__stat-value {
        font-weight: 700;
        color: var(--text2);
    }
}

.user-progress {
    display: flex;
    gap: 10px;

    margin-top: 14px;

    &__card {
        flex: 1;
        padding: 10px 12px;

        text-align: center;

        border: 1px solid var(--b1);
        border-radius: 9px;

        background: var(--s2);
    }

    &__val {
        font-family: var(--sm);
        font-size: 18px;
        font-weight: 700;

        &--green {
            color: var(--green);
        }

        &--yellow {
            color: var(--yellow);
        }

        &--blue {
            color: var(--blue);
        }

        &--orange {
            color: var(--orange);
        }

        &--purple {
            color: var(--purple);
        }
    }

    &__lbl {
        margin-top: 2px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--muted);
    }
}

@media (max-width: 1220px) {
    .user-progress {
        display: none;
    }
}

@media (max-width: 768px) {
    .hero {
        &__title {
            font-size: 21px;
        }

        &__sub {
            font-size: 11px;
        }
    }
}
</style>
