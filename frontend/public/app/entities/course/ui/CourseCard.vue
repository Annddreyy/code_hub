<template>
    <div class="course-card">
        <div class="course-card__banner">
            <div class="course-card__icon">{{ icon }}</div>
            <div :class="['course-card__badge', `course-card__badge--${status}`]">
                {{ getStatusString(status) }}
            </div>
        </div>
        <div class="course-card__body">
            <div class="course-card__cat">
                {{ category }}
                <span v-if="subCategory"> · {{ subCategory }}</span>
            </div>
            <div class="course-card__name">{{ title }}</div>
            <div class="course-card__desc">
                {{ description }}
            </div>
            <div class="course-card__tags">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="tag"
                >
                    {{ tag }}
                </span>
            </div>
            <div class="course-card__meta">
                <span>📖 {{ lessonsCount }} уроков</span>
                <span>⏱ ~{{ estimatedHours }}ч</span>
                <span :class="['course-card__level', `course-card__level--${difficulty}`]">
                    {{ getDifficultyString(difficulty) }}
                </span>
            </div>
            <div
                v-if="userMeta?.startCourse"
                class="progress"
            >
                <div class="progress__head">
                    <span class="progress__pct">{{ courseProgress }}%</span>
                    <span class="progress__num">
                        {{ userMeta?.currentLesson }}/{{ lessonsCount }}
                    </span>
                </div>
                <div class="progress__bar">
                    <div
                        class="progress__fill"
                        :style="`width: ${courseProgress}%;`"
                    />
                </div>
            </div>
            <NuxtLink
                :to="`/courses/${id}`"
                :class="[
                    'course-card__btn',
                    {
                        'course-card__btn--continue': userMeta?.startCourse,
                        'course-card__btn--start': !userMeta?.startCourse,
                    },
                ]"
            >
                <span v-if="userMeta?.startCourse">Продолжить</span>
                <span v-else>Начать</span>
                →
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Course, Difficulty, Status } from '../model/course';

const { modules, userMeta } = defineProps<Course>();

const lessonsCount = computed(
    () => modules?.reduce((sum, module) => sum + module.lessons.length, 0) || 0,
);
const courseProgress = computed(() =>
    Math.round((Number(userMeta.currentLesson) / lessonsCount.value) * 100),
);

const getDifficultyString = (difficulty: Difficulty) => {
    switch (difficulty) {
        case 'beginner':
            return 'Легкий';
        case 'intermediate':
            return 'Средний';
        default:
            return 'Сложный';
    }
};

const getStatusString = (status: Status) => {
    switch (status) {
        case 'hot':
            return 'Горячо';
        case 'new':
            return 'Новый';
        case 'popular':
            return 'Популярный';
    }
};
</script>

<style lang="scss" scoped>
.course-card {
    display: flex;
    flex-direction: column;

    border: 1px solid var(--b1);
    border-radius: 12px;

    background: var(--s1);
    overflow: hidden;

    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: var(--b2);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);

        transform: translateY(-3px);
    }

    &__banner {
        position: relative;
        height: 100px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: linear-gradient(135deg, rgba(79, 156, 255, 0.15), rgba(57, 212, 200, 0.1));
        overflow: hidden;
    }

    &__icon {
        position: relative;
        z-index: 1;

        font-size: 42px;
    }

    &__badge {
        position: absolute;
        top: 10px;
        right: 10px;

        padding: 2px 7px;

        font-family: var(--sm);
        font-size: 8px;
        font-weight: 700;

        border-radius: 3px;
        z-index: 1;

        &--new {
            color: var(--green);

            background: rgba(63, 185, 80, 0.2);
            border: 1px solid rgba(63, 185, 80, 0.3);
        }

        &--hot {
            color: var(--orange);

            background: rgba(255, 140, 66, 0.2);
            border: 1px solid rgba(255, 140, 66, 0.3);
        }

        &--popular {
            color: var(--blue);

            background: rgba(79, 156, 255, 0.2);
            border: 1px solid rgba(79, 156, 255, 0.3);
        }
    }

    &__body {
        display: flex;
        flex-direction: column;
        flex: 1;

        padding: 14px;
    }

    &__cat {
        margin-bottom: 4px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--muted);
    }

    &__name {
        margin-bottom: 5px;

        font-size: 14px;
        font-weight: 800;
        line-height: 1.25;
    }

    &__desc {
        margin-bottom: 12px;
        flex: 1;

        font-size: 11px;
        line-height: 1.55;
        color: var(--muted);
    }

    &__tags {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;

        margin-bottom: 12px;
    }

    &__meta {
        display: flex;
        gap: 12px;

        margin-bottom: 12px;

        font-family: var(--sm);
        font-size: 9px;
        color: var(--muted);
    }

    .progress {
        margin-bottom: 12px;

        &__head {
            display: flex;
            justify-content: space-between;

            margin-bottom: 4px;

            font-family: var(--sm);
            font-size: 9px;
        }

        &__pct {
            font-weight: 700;
            color: var(--green);
        }

        &__num {
            color: var(--dim);
        }

        &__bar {
            height: 4px;

            border-radius: 2px;
            background: var(--s3);
            overflow: hidden;
        }

        &__fill {
            position: relative;
            height: 100%;

            border-radius: 2px;
            background: linear-gradient(90deg, var(--blue), var(--cyan));
            overflow: hidden;

            &::after {
                position: absolute;
                content: '';

                inset: 0;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.25),
                    transparent
                );

                animation: shimmer 2s infinite;
            }
        }
    }

    .tag {
        padding: 2px 6px;

        font-family: var(--sm);
        font-size: 7px;
        font-weight: 700;
        color: var(--dim);

        border-radius: 3px;
        background: rgba(255, 255, 255, 0.04);
    }

    &__btn {
        width: 100%;
        padding: 9px;

        font-family: var(--sans);
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        color: var(--text);

        border: 1px solid var(--b2);
        border-radius: 8px;

        background: transparent;

        cursor: pointer;
        transition: all 0.18s;

        &:hover {
            color: #000;
            border-color: var(--blue);
            background: var(--blue);
        }

        &--start {
            color: #000;
            background: var(--blue);
            border-color: var(--blue);

            &:hover {
                background: #6aadff;
            }
        }

        &--continue {
            color: var(--green);

            &:hover {
                color: #000;
                background: var(--green);
            }
        }
    }

    &__level {
        margin-left: auto;
        padding: 2px 6px;

        font-family: var(--sm);
        font-size: 8px;
        font-weight: 700;

        border-radius: 3px;

        &--beginner {
            color: var(--green);
            background: rgba(63, 185, 80, 0.1);
        }

        &--intermediate {
            color: var(--yellow);
            background: rgba(227, 179, 65, 0.1);
        }

        &--advanced {
            color: var(--red);
            background: rgba(255, 92, 114, 0.1);
        }
    }
}
</style>
