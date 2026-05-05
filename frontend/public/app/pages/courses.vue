<template>
    <main>
        <Teleport
            v-if="isMounted"
            to="#sidebar"
        >
            <Sidebar
                v-if="categories && technologies"
                :technologies
                :categories
                @update-filters="debouncedUpdateFilters"
            />
        </Teleport>
        <CoursesHero :total-courses-count="coursesStore.totalCoursesCount" />
        <Tabs
            :total-count="coursesStore.totalCoursesCount"
            :in-progress-count="coursesStore.inProgressCoursesCount"
            @update-in-progress="updateInProgress"
        />
        <CoursesGrid
            v-if="coursesStore.courses"
            :courses="coursesStore.courses"
        />
        <Paginator
            :current-page="currentPage"
            :total-pages="totalPages"
            :sibling-count="SUBLING_COUNT"
            @update:current-page="debounceUpdateCurrentPage"
        />
    </main>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';
import { coursesApi, useCoursesStore, type Filters } from '@/entities/course';
import { CoursesHero, Tabs, CoursesGrid, Sidebar } from '@/widgets/Courses';
import { Paginator } from '@/shared/ui';

const SUBLING_COUNT = 5;

const cookieHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};

const coursesStore = useCoursesStore();

const filters = ref<Filters>({});
const isMounted = ref(false);

const currentPage = ref(1);

const [technologiesResult, categoriesResult] = await Promise.all([
    useAsyncData('technologies', () => coursesApi.getCoursesTechnologies(cookieHeaders)),
    useAsyncData('categories', () => coursesApi.getCoursesCategories(cookieHeaders)),
]);

const { data } = await useAsyncData(
    'courses',
    () => coursesStore.getCourses(filters.value, cookieHeaders),
    {
        watch: [filters],
        deep: true,
    },
);

const totalPages = computed(() => {
    if (!data.value) {
        return 0;
    }
    return Math.ceil(data.value.totalCount / data.value.pageSize);
});

const technologies = technologiesResult.data;
const categories = categoriesResult.data;

onMounted(() => {
    isMounted.value = true;
});

const updateFilters = (updatedFilters: Omit<Filters, 'inProgress'>) => {
    currentPage.value = 1;
    filters.value = {
        ...updatedFilters,
        page: 1,
        inProgress: filters.value.inProgress,
    };
};

const updateCurrentPage = (page: number) => {
    currentPage.value = page;
    filters.value = {
        ...filters.value,
        page,
    };
};

const debouncedUpdateFilters = debounce(updateFilters, 300);
const debounceUpdateCurrentPage = debounce(updateCurrentPage, 300);

const updateInProgress = (status: true | undefined) => {
    currentPage.value = 1;
    filters.value = {
        ...filters.value,
        inProgress: status,
        page: currentPage.value,
    };
};

useHead({
    title: 'Курсы',
});
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
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
