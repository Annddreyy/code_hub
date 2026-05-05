<template>
    <div class="course-grid">
        <CourseCard
            v-for="course in courses"
            :key="course.id"
            v-bind="course"
        />
    </div>
</template>

<script setup lang="ts">
import type { Course } from '@/entities/course';
import { CourseCard } from '@/entities/course';

defineProps<{
    courses: Course[];
}>();
</script>

<style lang="scss" scoped>
.course-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    padding: 20px 28px 40px;

    animation: fadeUp 0.4s 0.05s ease both;
}

@media (max-width: 1220px) {
    .course-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .course-grid {
        grid-template-columns: 1fr;
    }
}
</style>
