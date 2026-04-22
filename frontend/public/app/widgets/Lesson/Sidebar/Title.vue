<template>
    <div class="title">
        <div class="title__course-name">{{ title }}</div>
        <div class="title__prog-hdr">
            <span class="title__prog-number"> {{ progress }}% изучено </span>
            <span class="title__prog-lessons">
                {{ completedLessons }}/{{ totalLessons }} уроков
            </span>
        </div>
        <div class="title__bar">
            <div
                class="title__fill"
                :style="`width: ${progress}%`"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const { totalLessons, completedLessons } = defineProps<{
    title: string;
    totalLessons: number;
    completedLessons: number;
}>();

const progress = computed(() => Math.round((completedLessons / totalLessons) * 100));
</script>

<style lang="scss" scoped>
.title {
    margin-bottom: 20px;
    border-bottom: 1px solid var(--b1);

    &__course-name {
        font-size: 14px;
        font-weight: 800;
        margin-bottom: 10px;
        line-height: 1.2;
    }

    &__prog-hdr {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 5px;
    }

    &__prog-number {
        font-family: 'Space Mono', monospace;
        font-size: 10px;
        font-weight: 700;
        color: var(--green);
    }

    &__prog-lessons {
        font-family: 'Space Mono', monospace;
        font-size: 9px;
        color: var(--muted);
    }

    &__bar {
        height: 4px;

        background: var(--s3);
        border-radius: 2px;

        overflow: hidden;
    }

    &__fill {
        height: 100%;

        border-radius: 2px;
        background: linear-gradient(90deg, var(--green), var(--cyan));
    }
}
</style>
