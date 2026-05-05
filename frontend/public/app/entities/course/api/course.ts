import { instance } from '@/shared/api';
import type { Course } from '../model/course';

export type Category = {
    title: string;
    count: number;
};

export type Technologie = {
    title: string;
    count: number;
};

const COURSE_FOR_TEST: Course = {
    id: 'course_002',
    title: 'TypeScript: Полное руководство',
    status: null,
    description:
        'Изучите TypeScript с нуля до продвинутого уровня. Типизация, интерфейсы, generics, утилитарные типы и интеграция с React.',
    category: 'programming',
    subCategory: 'frontend',
    tags: ['typescript', 'javascript', 'frontend', 'hard'],
    icon: '📘',
    difficulty: 'intermediate',
    xpReward: 800,
    estimatedHours: 2.5,
    userMeta: {
        startCourse: true,
        currentLesson: 1,
        currentModule: 2,
    },
    modules: [
        {
            id: 'module_002_1',
            title: 'Основы TypeScript',
            lessons: [
                {
                    id: 'lesson_002_1_1',
                    title: 'Введение в TypeScript',
                    slug: 'intro-to-typescript',
                    description: 'Что такое TypeScript, установка, настройка tsconfig.json',
                    status: 'active',
                    tags: ['intro', 'setup'],
                    difficulty: 'easy',
                    durationInMinutes: 30,
                    xpReward: 60,
                    mdContent: '# TypeScript\n\nTypeScript - это надмножество JavaScript...',
                    tasks: [],
                },
                {
                    id: 'lesson_002_1_2',
                    title: 'Базовые типы',
                    slug: 'basic-types',
                    description: 'string, number, boolean, array, tuple, enum',
                    status: 'not-passed',
                    tags: ['types', 'basics'],
                    difficulty: 'easy',
                    durationInMinutes: 35,
                    xpReward: 70,
                    mdContent:
                        '# Базовые типы\n\nTypeScript предоставляет богатую систему типов...',
                    tasks: [
                        {
                            id: 'task_002_1_2_1',
                            variants: [
                                { id: 'var1', title: 'tuple', isAnswer: true },
                                { id: 'var2', title: 'object', isAnswer: false },
                            ],
                        },
                    ],
                },
                {
                    id: 'lesson_002_1_3',
                    title: 'Union и Intersection типы',
                    slug: 'union-intersection',
                    description: 'Объединение и пересечение типов, type aliases',
                    status: 'not-passed',
                    tags: ['union', 'intersection'],
                    difficulty: 'medium',
                    durationInMinutes: 40,
                    xpReward: 80,
                    mdContent: '# Union и Intersection\n\nUnion типы позволяют переменной...',
                    tasks: [],
                },
            ],
        },
        {
            id: 'module_002_2',
            title: 'Продвинутая типизация',
            lessons: [
                {
                    id: 'lesson_002_2_1',
                    title: 'Интерфейсы',
                    slug: 'interfaces',
                    description: 'Создание интерфейсов, опциональные свойства, readonly',
                    status: 'not-passed',
                    tags: ['interfaces'],
                    difficulty: 'medium',
                    durationInMinutes: 35,
                    xpReward: 70,
                    mdContent: '# Интерфейсы\n\nИнтерфейсы описывают форму объекта...',
                    tasks: [],
                },
                {
                    id: 'lesson_002_2_2',
                    title: 'Generics',
                    slug: 'generics',
                    description: 'Обобщенные типы, ограничения, generic функции и классы',
                    status: 'not-passed',
                    tags: ['generics'],
                    difficulty: 'hard',
                    durationInMinutes: 50,
                    xpReward: 100,
                    mdContent: '# Generics\n\nGenerics позволяют создавать компоненты...',
                    tasks: [
                        {
                            id: 'task_002_2_2_1',
                            variants: [
                                { id: 'var1', title: '<T>', isAnswer: true },
                                { id: 'var2', title: 'any', isAnswer: false },
                            ],
                        },
                    ],
                },
                {
                    id: 'lesson_002_2_3',
                    title: 'Утилитарные типы',
                    slug: 'utility-types',
                    description: 'Partial, Required, Readonly, Pick, Omit, Record',
                    status: 'not-passed',
                    tags: ['utility-types'],
                    difficulty: 'hard',
                    durationInMinutes: 45,
                    xpReward: 90,
                    mdContent: '# Утилитарные типы\n\nTypeScript предоставляет встроенные...',
                    tasks: [],
                },
            ],
        },
        {
            id: 'module_002_3',
            title: 'TypeScript в React',
            lessons: [
                {
                    id: 'lesson_002_3_1',
                    title: 'Типизация компонентов React',
                    slug: 'react-components-typing',
                    description: 'FC, PropsWithChildren, типизация пропсов',
                    status: 'not-passed',
                    tags: ['react', 'components'],
                    difficulty: 'hard',
                    durationInMinutes: 40,
                    xpReward: 80,
                    mdContent: '# React + TypeScript\n\nТипизация React компонентов...',
                    tasks: [],
                },
                {
                    id: 'lesson_002_3_2',
                    title: 'Хуки с TypeScript',
                    slug: 'hooks-with-typescript',
                    description: 'useState, useEffect, useReducer, useContext с типами',
                    status: 'not-passed',
                    tags: ['hooks', 'react'],
                    difficulty: 'hard',
                    durationInMinutes: 45,
                    xpReward: 90,
                    mdContent: '# Типизация хуков\n\nКаждый React хук можно типизировать...',
                    tasks: [
                        {
                            id: 'task_002_3_2_1',
                            variants: [
                                { id: 'var1', title: 'useState<number>', isAnswer: true },
                                { id: 'var2', title: 'useState()', isAnswer: false },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export type Filters = {
    page?: number;
    categories?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
    technologies?: string[];
    sortBy?: string;
    duration?: string;
    inProgress?: boolean;
};

type CoursesResponse = {
    courses: Course[];
    totalCount: number;
    pageSize: number;
    totalCoursesCount: number;
    inProgressCoursesCount: number;
};

export const coursesApi = {
    getCourses: async (filters: Filters = {}, headers = {}) => {
        return await instance.post<CoursesResponse>('courses', filters, { headers });
    },

    getCoursesCategories: async (headers = {}) => {
        return (await instance.get<Category[]>('courses/tags', { headers })).data;
    },

    getCoursesTechnologies: async (headers = {}) => {
        return (await instance.get<Technologie[]>('courses/technologies', { headers })).data;
    },

    getCourse: async (_id: string) => {
        return Promise.resolve(COURSE_FOR_TEST);
    },
};
