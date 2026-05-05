import type { Lesson } from '~/entities/lesson';

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}
