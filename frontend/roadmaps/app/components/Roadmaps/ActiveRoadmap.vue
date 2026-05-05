<template>
    <div class="featured-card">
        <div class="featured-card__icon-wrap">{{ icon }}</div>
        <div class="featured-card__info">
            <div class="featured-card__badge">🚀 Активный роадмап</div>
            <div class="featured-card__title">{{ title }}</div>
            <div class="featured-card__description">{{ description }}</div>
            <div class="featured-card__tags">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="tag"
                >
                    {{ tag }}
                </span>
            </div>
            <div class="featured-card__progress">
                <div class="prog-bar">
                    <div
                        class="prog-bar__fill"
                        :style="`width: ${progress}%`"
                    />
                </div>
                <span class="prog-bar__text">{{ currentNode }} / {{ totalNodes }} узлов</span>
            </div>
        </div>
        <div class="featured-card__right">
            <div class="featured-card__nodes">
                <div class="featured-card__nodes-num">{{ progress }}%</div>
                <div class="featured-card__nodes-lbl">прогресс</div>
            </div>
            <div class="featured-card__xp">⚡ +{{ xp }} XP</div>
            <NuxtLink
                :to="`/roadmaps/${id}`"
                class="featured-card__btn"
            >
                Продолжить →
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { currentNode, totalNodes } = defineProps<{
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    currentNode: number;
    totalNodes: number;
    xp: number;
}>();

const progress = computed(() => Math.floor((currentNode / totalNodes) * 100));
</script>

<style lang="scss" scoped>
.featured-card {
    position: relative;

    display: flex;
    align-items: center;
    gap: 28px;

    margin-bottom: 24px;
    padding: 24px 28px;

    border: 1px solid var(--b1);
    border-radius: 14px;

    overflow: hidden;
    background: var(--s1);
    cursor: pointer;

    transition: all 0.25s;
    animation: cardIn 0.4s ease both;

    &::before {
        position: absolute;
        content: '';

        inset: 0;
        background: linear-gradient(135deg, rgba(79, 156, 255, 0.05), rgba(188, 140, 255, 0.03));
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-2px);

        border-color: rgba(79, 156, 255, 0.3);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
    }

    &__icon-wrap {
        width: 80px;
        height: 80px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        font-size: 38px;

        border: 1px solid rgba(79, 156, 255, 0.2);
        border-radius: 16px;

        background: linear-gradient(135deg, rgba(79, 156, 255, 0.12), rgba(79, 156, 255, 0.04));

        animation: float 4s ease-in-out infinite;
    }

    &__info {
        flex: 1;
        min-width: 0;
    }

    &__badge {
        display: inline-block;
        margin-bottom: 8px;
        padding: 3px 9px;

        font-family: var(--spaced);
        font-size: 8px;
        font-weight: 700;
        color: var(--blue);

        border: 1px solid rgba(79, 156, 255, 0.25);
        border-radius: 20px;

        background: rgba(79, 156, 255, 0.1);
    }

    &__title {
        margin-bottom: 5px;

        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.02em;
    }

    &__description {
        margin-bottom: 14px;

        font-size: 12px;
        line-height: 1.55;
        color: var(--muted);
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        margin-bottom: 14px;

        .tag {
            padding: 2px 7px;

            font-family: var(--spaced);
            font-size: 8px;
            color: var(--dim);

            border: 1px solid var(--b1);
            border-radius: 3px;

            background: var(--s2);
        }
    }

    &__progress {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
        flex-shrink: 0;
    }

    &__nodes {
        text-align: center;
    }

    &__nodes-num {
        font-family: var(--spaced);
        font-size: 28px;
        font-weight: 700;
        color: var(--blue);
        line-height: 1;
    }

    &__nodes-lbl {
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

    &__btn {
        margin-top: auto;
        padding: 10px 22px;

        font-family: var(--sans);
        font-size: 13px;
        font-weight: 800;
        color: #fff;

        border: none;
        border-radius: 9px;

        background: linear-gradient(135deg, var(--blue), #3d7de8);
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 18px rgba(79, 156, 255, 0.35);
        }
    }
}

.prog-bar {
    height: 5px;
    flex: 1;

    border-radius: 3px;

    background: var(--s3);
    overflow: hidden;

    &__fill {
        position: relative;
        height: 100%;

        border-radius: 3px;
        background: linear-gradient(90deg, var(--blue), var(--cyan));

        &::after {
            position: absolute;
            content: '';

            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
            background-size: 200% 100%;

            animation: shimmer 2s infinite;
        }
    }

    &__text {
        flex-shrink: 0;

        font-family: var(--spaced);
        font-size: 9px;
        font-weight: 700;
        color: var(--blue);
    }
}

@media (max-width: 1220px) {
    .featured-card {
        &__icon-wrap {
            width: 50px;
            height: 50px;

            font-size: 24px;
        }
    }
}

@media (max-width: 768px) {
    .featured-card {
        flex-direction: column;
        align-items: flex-start;

        &__icon-wrap {
            display: none;
        }

        &__right {
            flex-direction: row;
            align-items: center;
        }

        &__nodes {
            display: none;
        }
    }
}
</style>
