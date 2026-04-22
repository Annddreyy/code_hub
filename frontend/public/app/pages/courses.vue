<template>
    <main>
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar
                v-if="categories && languages"
                :languages="languages"
                :categories="categories"
                @update-filters="updateFilters"
            />
        </Teleport>
        <CoursesHero :total-courses-count="totalCourses" />
        <Tabs
            :total-count="totalCourses"
            :in-progress-count="inProgressCount"
            @update-in-progress="updateInProgress"
        />
        <CoursesGrid
            v-if="coursesStore.courses"
            :courses="coursesStore.courses"
        />
    </main>
</template>

<script setup lang="ts">
import { coursesApi, useCoursesStore, type Filters } from '@/entities/course';
import { CoursesHero, Tabs, CoursesGrid, Sidebar } from '@/widgets/Courses';

const coursesStore = useCoursesStore();

const filters = ref<Filters>({});
const isMounted = ref(false);

const [languagesResult, categoriesResult] = await Promise.all([
    useAsyncData('languages', () => coursesApi.getCoursesLanguages()),
    useAsyncData('categories', () => coursesApi.getCoursesCategories()),
]);

await useAsyncData('courses', () => coursesStore.getCourses(filters.value), {
    watch: [filters],
    deep: true,
});

const languages = languagesResult.data;
const categories = categoriesResult.data;

const totalCourses = computed(() => coursesStore.courses.length);
const inProgressCount = computed(() => coursesStore.userCourses.length);

onMounted(() => {
    isMounted.value = true;
});

const updateFilters = (updatedFilters: Omit<Filters, 'inProgress'>) => {
    filters.value = {
        ...updatedFilters,
        inProgress: filters.value.inProgress,
    };
};

const updateInProgress = (status: true | undefined) => {
    filters.value.inProgress = status;
};

useHead({
    title: 'Курсы',
});
</script>

<style lang="scss" scoped>
main {
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--s3);
    }
}
</style>
