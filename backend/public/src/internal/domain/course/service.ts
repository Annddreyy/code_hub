import { CoursesFiltersDto } from '@/internal/api/course/dto';
import { coursesRepository } from './repository';

export const coursesService = {
    async getCourses(filters: CoursesFiltersDto, userId: string) {
        return await coursesRepository.getAllCourses(filters, userId);
    },
};
