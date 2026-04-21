<template>
    <SectionWrapper
        section-title="Мои курсы"
        link-title="Смотреть все"
        link="/courses"
    >
        <div class="courses">
            <CourseStrip
                v-for="course in userCourses"
                :key="course.id"
                v-bind="course"
            />
        </div>
    </SectionWrapper>
</template>

<script setup lang="ts">
import { CourseStrip, type Course } from '@/entities/course';
import SectionWrapper from './SectionWrapper.vue';

defineProps<{
    userCourses: Course[];
}>();
</script>

<style lang="scss" scoped>
.courses {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
