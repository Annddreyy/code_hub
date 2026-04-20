<template>
    <SectionWrapper
        section-title="Продолжить обучение"
        link-title="Все курсы"
        link="/courses"
    >
        <ActiveCourse :course="activeCourse" />
    </SectionWrapper>
</template>

<script setup lang="ts">
import { ActiveCourse, type Course } from '@/entities/course';
import SectionWrapper from './SectionWrapper.vue';

defineProps<{
    activeCourse: Course;
}>();
</script>
