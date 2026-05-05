<template>
    <aside class="detail">
        <div class="detail__head">
            <div class="detail__tag">{{ icon }} {{ statusOnRussion }}</div>
            <div class="detail__title">{{ title }}</div>
            <div class="detail__description">
                {{ description }}
            </div>
        </div>
        <div class="detail__body">
            <div class="detail__section">
                <div class="detail__section-header">// ваг прогрес</div>
                <div class="stat-grid">
                    <StatCard
                        v-for="stat in stats"
                        :key="stat.label"
                        v-bind="stat"
                    />
                </div>
                <div class="prog-bar">
                    <div
                        class="prog-bar__fill"
                        :style="`width: ${progress}%`"
                    />
                </div>
                <div class="detail__progress">
                    {{ lessonsDoneCount }} / {{ totalLessonsCount }} уроков · {{ progress }}%
                    пройдено
                </div>
            </div>

            <div class="detail__section">
                <div class="detail__section-header">// Уроки</div>
                <LessonCard
                    v-for="lesson in lessons"
                    :key="lesson.title"
                    v-bind="lesson"
                />
            </div>
        </div>
        <div class="detail__foot foot">
            <button class="foot__button">Продолжить обучение →</button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { NodeStatus } from '@/api';
import type { NodeLesson, Stat } from '@/api/roadmap';
import StatCard from './StatCard.vue';
import LessonCard from './LessonCard.vue';

const { lessons, status } = defineProps<{
    icon: string;
    status: NodeStatus;
    title: string;
    description: string;
    stats: Stat[];
    lessons: NodeLesson[];
}>();

const lessonsDoneCount = computed(
    () => lessons.filter((lesson) => lesson.status === NodeStatus.DONE).length,
);
const totalLessonsCount = computed(() => lessons.length);
const progress = computed(() => (lessonsDoneCount.value / totalLessonsCount.value) * 100);

const statusOnRussion = computed(() => {
    switch (status) {
        case NodeStatus.ACTIVE:
            return 'В процессе';
        case NodeStatus.DONE:
            return 'Пройдено';
        default:
            return 'Закрыто';
    }
});
</script>

<style lang="scss" scoped>
.detail {
    width: 300px;
    height: 100vh;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    border-left: 1px solid var(--b1);
    background: var(--s1);

    overflow: hidden;

    &__head {
        padding: 18px 18px 14px;

        border-bottom: 1px solid var(--b1);
    }

    &__tag {
        display: inline-block;
        margin-bottom: 8px;
        padding: 3px 8px;

        font-family: var(--spaced);
        font-size: 8px;
        font-weight: 700;
        color: var(--blue);

        border: 1px solid rgba(79, 156, 255, 0.2);
        border-radius: 4px;

        background: rgba(79, 156, 255, 0.1);
    }

    &__title {
        margin-bottom: 4px;

        font-size: 17px;
        font-weight: 800;
        letter-spacing: -0.01em;
    }

    &__description {
        font-size: 12px;
        line-height: 1.55;
        color: var(--muted);
    }

    &__body {
        flex: 1;
        padding: 16px 18px;

        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--s3);
        }
    }

    &__section {
        margin-bottom: 18px;
    }

    &__section-header {
        margin-bottom: 8px;

        font-family: var(--spaced);
        font-size: 8px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--dim);
    }

    &__progress {
        margin-top: 4px;

        font-family: var(--spaced);
        font-size: 8px;
        color: var(--muted);
    }

    .prog-bar {
        margin-top: 8px;

        &__fill {
            background: linear-gradient(90deg, var(--blue), var(--purple));
        }
    }

    .foot {
        margin-top: auto;
        padding: 14px 18px;

        border-top: 1px solid var(--b1);

        &__button {
            width: 100%;
            padding: 11px;

            font-family: var(--sans);
            font-size: 13px;
            font-weight: 800;
            color: #fff;

            border: none;
            border-radius: 9px;

            cursor: pointer;
            background: linear-gradient(135deg, var(--blue), #3d7de8);

            transition: all 0.2s;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(79, 156, 255, 0.35);
            }

            &--done {
                color: var(--green);
                border: 1px solid rgba(63, 185, 80, 0.3);
                background: rgba(63, 185, 80, 0.1);
            }

            &--locked {
                color: var(--dim);
                background: var(--s3);
                cursor: not-allowed;
            }
        }
    }
}

.stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    margin-bottom: 4px;
}

@media (max-width: 1220px) {
    .detail {
        width: 100%;
        height: 400px;
    }
}
</style>
