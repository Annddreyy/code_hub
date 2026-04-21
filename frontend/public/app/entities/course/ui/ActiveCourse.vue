<template>
    <div class="active-course">
        <div class="active-course__header">
            <div class="active-course__icon">
                {{ course.icon }}
            </div>
            <div
                v-if="currentLesson && currentModule"
                class="active-course__meta"
            >
                <div class="active-course__cat">{{ course.title }} · Глава {{ currentModule }}</div>
                <div class="active-course__name">
                    {{ course.modules[currentModule]?.lessons[currentLesson - 1]?.title }}
                </div>
                <div class="active-course__topic">
                    Дальше: {{ course.modules[currentModule]?.lessons[currentLesson + 1]?.title }} →
                </div>
            </div>
        </div>
        <div class="active-course__progress">
            <div class="active-course__head">
                <span class="active-course__pct">{{ currentCourseProgress }}%</span>
                <span class="active-course__num">
                    {{ currentLesson }} / {{ totalLessonsCount }} уроков
                </span>
            </div>
            <div class="active-course__bar">
                <div
                    class="active-course__fill"
                    :style="`width: ${currentCourseProgress}%`"
                />
            </div>
        </div>
        <button class="active-course__btn">Продолжит урок →</button>
    </div>
</template>

<script setup lang="ts">
import type { Course } from '../model/course';

const { course } = defineProps<{
    course: Course;
}>();

const currentLesson = computed(() => course.userMeta.currentLesson);
const currentModule = computed(() => course.userMeta.currentModule);

const totalLessonsCount = computed(() =>
    course.modules.reduce((sum, module) => sum + module.lessons.length, 0),
);
const currentCourseProgress = computed(() => {
    const currentLessonValue = currentLesson.value;
    const totalLessons = totalLessonsCount.value;

    if (currentLessonValue == null || totalLessons === 0) {
        return 0;
    }

    return Math.round((Number(currentLessonValue) / totalLessons) * 100);
});
</script>

<style lang="scss" scoped>
.active-course {
    &__header {
        display: flex;
        gap: 12px;

        margin-bottom: 14px;
    }

    &__icon {
        width: 48px;
        height: 48px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        font-size: 22px;

        border-radius: 10px;
        background: rgba(79, 156, 255, 0.12);
    }

    &__meta {
        flex: 1;
    }

    &__cat {
        margin-bottom: 3px;

        font-family: var(--sm);
        font-size: 8px;
        color: var(--muted);
    }

    &__name {
        margin-bottom: 3px;

        font-size: 15px;
        font-weight: 800;
    }

    &__topic {
        font-size: 12px;
        color: var(--muted);
    }

    &__progress {
        margin-bottom: 14px;
    }

    &__head {
        display: flex;
        justify-content: space-between;

        margin-bottom: 5px;
    }

    &__pct {
        font-family: var(--sm);
        font-size: 10px;
        font-weight: 700;
        color: var(--green);
    }

    &__num {
        font-family: var(--sm);
        font-size: 9px;
        color: var(--muted);
    }

    &__bar {
        height: 5px;

        border-radius: 3px;
        background: var(--s3);

        overflow: hidden;
    }

    &__fill {
        position: relative;
        height: 100%;

        border-radius: 3px;
        background: linear-gradient(90deg, var(--green), var(--cyan));

        overflow: hidden;

        &::after {
            position: absolute;
            content: '';

            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);

            animation: shimmer 2s infinite;
        }
    }

    &__btn {
        width: 100%;
        padding: 10px;

        border: none;
        border-radius: 8px;

        font-family: var(--sans);
        font-size: 12px;
        font-weight: 800;
        color: #000;

        background: var(--blue);

        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #6aadff;
        }
    }
}

@media (max-width: 768px) {
    .active-course {
        &__icon {
            display: none;
        }
    }
}
</style>
