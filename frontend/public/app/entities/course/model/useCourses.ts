import type { Filters } from '@/entities/challenge';
import { coursesApi } from '../api/course';
import type { Course } from './course';

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([]);
    const totalCount = ref(0);
    const pageSize = ref(0);
    const totalCoursesCount = ref(0);
    const inProgressCoursesCount = ref(0);

    const isLoading = ref(false);
    const errorMessage = ref('');

    const getCourses = async (filters: Filters = {}, headers = {}) => {
        isLoading.value = true;

        try {
            const response = (await coursesApi.getCourses(filters, headers)).data;
            courses.value = response.courses;
            totalCount.value = response.totalCount;
            pageSize.value = response.pageSize;
            totalCoursesCount.value = response.totalCoursesCount;
            inProgressCoursesCount.value = response.inProgressCoursesCount;
            return response;
        } catch (err: unknown) {
            errorMessage.value = err as string;
        } finally {
            isLoading.value = false;
        }

        return null;
    };

    return {
        courses,
        isLoading,
        errorMessage,
        getCourses,
        totalCount,
        totalCoursesCount,
        inProgressCoursesCount,
    };
});
