<template>
    <div class="course-strip">
        <div class="course-strip__item">
            <div class="course-strip__icon">{{ icon }}</div>
            <div class="course-strip__body">
                <div class="course-strip__name">{{ title }}</div>
                <div class="course-strip__sub">{{ currentLesson }}/{{ lessonsCount }} уроков</div>
            </div>
            <div class="course-strip__bar">
                <div
                    class="course-strip__bf"
                    :style="`width: ${courseProgress}%; background: var(--blue)`"
                />
            </div>
            <div
                class="course-strip__pct"
                style="color: var(--blue)"
            >
                {{ courseProgress }}%
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Course } from '../model/course';

const { modules, userMeta } = defineProps<Course>();

const currentLesson = computed(() => userMeta.currentLesson);
const lessonsCount = computed(() =>
    modules.reduce((sum, module) => sum + module.lessons.length, 0),
);
const courseProgress = computed(() =>
    Math.round((Number(currentLesson.value) / lessonsCount.value) * 100),
);
</script>

<style lang="scss" scoped>
.course-strip {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__item {
        display: flex;
        align-items: center;
        gap: 10px;

        padding: 10px 12px;

        border: 1px solid var(--b1);
        border-radius: 9px;

        background: var(--s1);
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
            border-color: var(--b2);
            background: var(--s2);
        }
    }

    &__icon {
        width: 32px;
        flex-shrink: 0;

        font-size: 18px;
        text-align: center;
    }

    &__body {
        flex: 1;
        min-width: 0;
    }

    &__name {
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        text-overflow: ellipsis;

        overflow: hidden;
    }

    &__sub {
        font-family: var(--sm);
        font-size: 9px;
        color: var(--muted);
    }

    &__pct {
        flex-shrink: 0;

        font-family: var(--sm);
        font-size: 10px;
        font-weight: 700;
    }

    &__bar {
        width: 60px;
        height: 3px;
        flex-shrink: 0;

        border-radius: 2px;

        background: var(--s3);
        overflow: hidden;
    }

    &__bf {
        height: 100%;
        border-radius: 2px;
    }
}

@media (max-width: 768px) {
    .course-strip {
        &__icon {
            display: none;
        }

        &__name {
            white-space: initial;
        }
    }
}
</style>
