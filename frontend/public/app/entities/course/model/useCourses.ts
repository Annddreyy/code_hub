import type { Filters } from '@/entities/challenge';
import { coursesApi } from '../api/course';
import type { Course } from './course';

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([]);
    const isLoading = ref(false);
    const errorMessage = ref('');

    const userCourses = computed<Course[]>(() =>
        courses.value.filter((course) => course.userMeta.startCourse),
    );

    const getCourses = async (filters: Filters = {}) => {
        isLoading.value = true;

        try {
            courses.value = await coursesApi.getCourses(filters);
        } catch (err: unknown) {
            errorMessage.value = err as string;
        } finally {
            isLoading.value = false;
        }
    };

    return { courses, isLoading, errorMessage, userCourses, getCourses };
});
