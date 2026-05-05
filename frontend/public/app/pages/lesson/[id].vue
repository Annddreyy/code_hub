<template>
    <div>
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar
                v-if="course"
                :completed-lessons="12"
                :course-title="course.title"
                :modules="course.modules"
            />
        </Teleport>
        <main>
            <Hero
                v-if="lesson"
                :lesson-title="lesson?.title"
                :description="lesson.description"
                :tags="lesson.tags"
                :difficulty="lesson.difficulty"
                :xp-reward="lesson.xpReward"
                :duration="lesson.durationInMinutes"
                :current-lesson="12"
                :total-lessons="50"
            />
            <LessonBody
                v-if="lesson"
                :html="lesson.mdContent"
            />
            <CompleteBar
                :next-lesson-title="'test'"
                @complete="console.log('complete')"
            />
            <Buttons
                :next-lesson-link="'/'"
                :prev-lesson-link="'/'"
                :next-lesson-title="'test'"
                :prev-lesson-title="'test'"
            />
        </main>
        <RightSidebar />
    </div>
</template>

<script setup lang="ts">
import { Buttons, CompleteBar, Hero, LessonBody, RightSidebar, Sidebar } from '@/widgets/Lesson';
import { coursesApi } from '@/entities/course';
import { lessonApi } from '@/entities/lesson';

const COURSE_API_FOR_TEST = '1';

const route = useRoute();

const isMounted = ref(false);

const [courseResult, lessonResult] = await Promise.all([
    useAsyncData('course', () => coursesApi.getCourse(COURSE_API_FOR_TEST)),
    useAsyncData('lesson', () => lessonApi.getLesson(route.params.id as string)),
]);

const course = courseResult.data;
const lesson = lessonResult.data;

onMounted(() => {
    isMounted.value = true;
});
</script>

<style lang="scss" scoped>
main {
    min-width: 0;
    height: 100vh;
    padding: 36px 56px 80px;

    overflow: auto;

    &::-webkit-scrollbar {
        width: 0;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
    }
}

@media (max-width: 1220px) {
    main {
        height: calc(100vh - 80px);
        padding: 24px 20px 0;
    }
}

@media (max-width: 768px) {
    main {
        height: calc(100vh - 120px);
    }
}
</style>
