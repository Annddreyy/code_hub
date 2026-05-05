<template>
    <div class="roadmap-card in-progress">
        <div class="roadmap-card__head">
            <div class="roadmap-card__top">
                <div class="roadmap-card__icon">{{ icon }}</div>
                <div class="roadmap-card__meta">
                    <div class="roadmap-card__title">{{ title }}</div>
                </div>
                <div :class="`badge badge--${status}`">{{ statusText }}</div>
            </div>
            <div class="roadmap-card__tags">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="tag"
                >
                    {{ tag }}
                </span>
            </div>
        </div>
        <div class="roadmap-card__body">
            <div class="roadmap-card__description">
                {{ description }}
            </div>
            <div class="roadmap-card__stats">
                <div class="roadmap-card__stat">
                    <div class="roadmap-card__stat-val roadmap-card__stat-val--blue">
                        {{ currentNode }}
                    </div>
                    <div class="roadmap-card__stat-lbl">Пройдено</div>
                </div>
                <div class="roadmap-card__divider" />
                <div class="roadmap-card__stat">
                    <div class="roadmap-card__stat-val roadmap-card__stat-val--gray">
                        {{ totalNodes }}
                    </div>
                    <div class="roadmap-card__stat-lbl">Всего</div>
                </div>
                <div class="roadmap-card__divider" />
                <div class="roadmap-card__stat">
                    <div class="roadmap-card__stat-val roadmap-card__stat-val--orange">3h</div>
                    <div class="roadmap-card__stat-lbl">Осталось</div>
                </div>
            </div>
            <div class="roadmap-card__prog">
                <div class="roadmap-card__prog-row">
                    <span class="roadmap-card__prog-lbl">Прогресс</span>
                    <span class="roadmap-card__prog-pct">{{ progress }}%</span>
                </div>
                <div class="progress-bar">
                    <div
                        class="progress-bar__fill"
                        :style="`width: ${progress}%`"
                    />
                </div>
            </div>
            <div class="roadmap-card__foot">
                <span class="roadmap-card__xp">⚡ +{{ xp }} XP</span>
                <NuxtLink
                    :to="`/roadmaps/${id}`"
                    :class="`action action--${status}`"
                >
                    {{ buttonText }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RoadmapStatus, type Roadmap } from '@/api/roadmap';

const { currentNode, totalNodes, status } = defineProps<Roadmap>();

const progress = computed(() => Math.floor((currentNode / totalNodes) * 100));
const statusText = computed(() => {
    switch (status) {
        case RoadmapStatus.COMPLETED:
            return '✓ Завершёна';
        case RoadmapStatus.ACTIVE:
            return 'В процессе';
        case RoadmapStatus.NEW:
            return 'Новая';
        default:
            return 'Заблокирована';
    }
});
const buttonText = computed(() => {
    switch (status) {
        case RoadmapStatus.COMPLETED:
            return 'Повторить';
        case RoadmapStatus.ACTIVE:
            return 'Продолжить';
        case RoadmapStatus.NEW:
            return 'Начать';
        default:
            return 'Заблокирована';
    }
});
</script>

<style lang="scss" scoped>
.roadmap-card {
    position: relative;

    border: 1px solid var(--b1);
    border-radius: 13px;

    background: var(--s1);

    overflow: hidden;
    cursor: pointer;

    transition: all 0.2s;
    animation: cardIn 0.15s ease both;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    &::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;

        height: 2px;
    }

    &--active {
        &:hover {
            border-color: rgba(79, 156, 255, 0.28);
            animation: neonPulse 2s ease-in-out infinite;
        }

        &::before {
            background: linear-gradient(90deg, var(--blue), var(--cyan));
        }
    }

    &--completed {
        &:hover {
            border-color: rgba(63, 185, 80, 0.28);
        }

        &::before {
            background: linear-gradient(90deg, var(--green), var(--cyan));
        }
    }

    &--new {
        &:hover {
            border-color: rgba(188, 140, 255, 0.28);
        }

        &::before {
            background: linear-gradient(90deg, var(--purple), var(--pink));
        }
    }

    &--locked {
        opacity: 0.6;

        &::before {
            background: var(--s3);
        }
    }

    &__head {
        padding: 18px 18px 12px;
        border-bottom: 1px solid var(--b1);
    }

    &__top {
        display: flex;
        align-items: flex-start;
        gap: 12px;

        margin-bottom: 10px;
    }

    &__icon {
        width: 46px;
        height: 46px;

        font-size: 22px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        border: 1px solid rgba(227, 179, 65, 0.2);
        border-radius: 11px;

        background: rgba(227, 179, 65, 0.1);
    }

    &__meta {
        flex: 1;
        min-width: 0;
    }

    &__title {
        margin-bottom: 3px;

        font-size: 14px;
        font-weight: 800;
        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;
    }

    &__subtitle {
        font-family: var(--spaced);
        font-size: 9px;
        color: var(--muted);
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    &__body {
        padding: 14px 18px;
    }

    &__description {
        display: -webkit-box;
        margin-bottom: 14px;

        font-size: 12px;
        line-height: 1.55;
        line-clamp: 2;
        color: var(--muted);

        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        overflow: hidden;
    }

    &__stats {
        display: flex;
        gap: 0;

        margin-bottom: 12px;
    }

    &__stat {
        flex: 1;
        text-align: center;
    }

    &__stat-val {
        margin-bottom: 2px;

        font-family: var(--spaced);
        font-size: 13px;
        font-weight: 700;
        line-height: 1;

        &--blue {
            color: var(--blue);
        }

        &--gray {
            color: var(--gray);
        }

        &--orange {
            color: var(--orange);
        }
    }

    &__stat-lbl {
        font-family: var(--spaced);
        font-size: 7px;
        color: var(--muted);
    }

    &__prog {
        margin-bottom: 14px;
    }

    &__prog-row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 4px;
    }

    &__prog-lbl {
        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }

    &__prog-pct {
        font-family: var(--spaced);
        font-size: 8px;
        font-weight: 700;
    }

    &__foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__xp {
        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--yellow);
    }
}

.badge {
    margin-top: 2px;
    padding: 2px 7px;
    flex-shrink: 0;

    font-family: var(--spaced);
    font-size: 7px;
    font-weight: 700;

    border-radius: 10px;

    &--active {
        color: var(--blue);
        border: 1px solid rgba(79, 156, 255, 0.2);
        background: rgba(79, 156, 255, 0.1);
    }

    &--completed {
        color: var(--green);
        border: 1px solid rgba(63, 185, 80, 0.2);
        background: rgba(63, 185, 80, 0.1);
    }

    &--new {
        color: var(--purple);
        border: 1px solid rgba(188, 140, 255, 0.2);
        background: rgba(188, 140, 255, 0.1);
    }

    &--locked {
        color: var(--dim);
        border: 1px solid rgba(72, 79, 88, 0.2);
        background: rgba(72, 79, 88, 0.1);
    }
}

.action {
    padding: 6px 14px;

    font-family: var(--spaced);
    font-size: 9px;
    font-weight: 700;

    border: none;
    border-radius: 7px;
    cursor: pointer;

    transition: all 0.2s;

    &--active {
        background: rgba(79, 156, 255, 0.1);
        color: var(--blue);
        border: 1px solid rgba(79, 156, 255, 0.25);

        &:hover {
            background: rgba(79, 156, 255, 0.18);
        }
    }

    &--new {
        color: var(--purple);
        border: 1px solid rgba(188, 140, 255, 0.25);
        background: rgba(188, 140, 255, 0.1);

        &:hover {
            background: rgba(188, 140, 255, 0.18);
        }
    }

    &--completed {
        color: var(--green);
        border: 1px solid rgba(63, 185, 80, 0.25);
        background: rgba(63, 185, 80, 0.1);

        &:hover {
            background: rgba(63, 185, 80, 0.18);
        }
    }

    &--locked {
        color: var(--dim);
        border: 1px solid var(--b1);
        background: var(--s2);
        cursor: not-allowed;
    }
}

.progress-bar {
    height: 5px;
    flex: 1;

    border-radius: 3px;
    background: var(--s3);

    overflow: hidden;

    &__fill {
        position: relative;
        height: 100%;

        border-radius: 3px;
        background: linear-gradient(90deg, var(--yellow), var(--orange));

        &::after {
            position: absolute;
            content: '';

            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
            background-size: 200% 100%;

            animation: shimmer 2s infinite;
        }
    }
}
</style>
