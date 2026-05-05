import type { User } from '../model/user';

export type LanguageProgress = {
    title: string;
    icon: string;
    progressPercent: number;
    color: string;
};

export type HeatmapCell = {
    level: 0 | 1 | 2 | 3 | 4;
    date: string;
    contributions: number;
};

export type RecentActivity = {
    id: string;
    title: string;
    substring: string;
    icon: string;
    xpReward: number;
    agoSeconds: number;
};

const LANGUAGES_PROGRESS: LanguageProgress[] = [
    {
        title: 'JavaScript',
        icon: '⚡',
        progressPercent: 92,
        color: 'orange',
    },
    {
        title: 'TypeScript',
        icon: '🔷',
        progressPercent: 84,
        color: 'blue',
    },
    {
        title: 'Python',
        icon: '🐍',
        progressPercent: 71,
        color: 'green',
    },
    {
        title: 'React',
        icon: '⚛️',
        progressPercent: 88,
        color: 'cyan',
    },
    {
        title: 'Go',
        icon: '🐹',
        progressPercent: 43,
        color: 'blue',
    },
];

const HEATMAP_DATA: HeatmapCell[] = [
    // Неделя 1 (самая старая)
    { level: 0, date: '2025-10-01', contributions: 0 },
    { level: 0, date: '2025-10-02', contributions: 0 },
    { level: 1, date: '2025-10-03', contributions: 1 },
    { level: 1, date: '2025-10-04', contributions: 2 },
    { level: 2, date: '2025-10-05', contributions: 4 },
    { level: 1, date: '2025-10-06', contributions: 2 },
    { level: 0, date: '2025-10-07', contributions: 0 },

    // Неделя 2
    { level: 0, date: '2025-10-08', contributions: 0 },
    { level: 2, date: '2025-10-09', contributions: 5 },
    { level: 3, date: '2025-10-10', contributions: 8 },
    { level: 2, date: '2025-10-11', contributions: 4 },
    { level: 2, date: '2025-10-12', contributions: 3 },
    { level: 1, date: '2025-10-13', contributions: 1 },
    { level: 0, date: '2025-10-14', contributions: 0 },

    // Неделя 3
    { level: 1, date: '2025-10-15', contributions: 1 },
    { level: 2, date: '2025-10-16', contributions: 3 },
    { level: 4, date: '2025-10-17', contributions: 15 },
    { level: 3, date: '2025-10-18', contributions: 9 },
    { level: 2, date: '2025-10-19', contributions: 5 },
    { level: 1, date: '2025-10-20', contributions: 2 },
    { level: 0, date: '2025-10-21', contributions: 0 },

    // Неделя 4
    { level: 0, date: '2025-10-22', contributions: 0 },
    { level: 1, date: '2025-10-23', contributions: 2 },
    { level: 2, date: '2025-10-24', contributions: 4 },
    { level: 2, date: '2025-10-25', contributions: 3 },
    { level: 1, date: '2025-10-26', contributions: 1 },
    { level: 0, date: '2025-10-27', contributions: 0 },
    { level: 0, date: '2025-10-28', contributions: 0 },

    // Неделя 5
    { level: 1, date: '2025-10-29', contributions: 2 },
    { level: 3, date: '2025-10-30', contributions: 7 },
    { level: 4, date: '2025-10-31', contributions: 12 },
    { level: 4, date: '2025-11-01', contributions: 14 },
    { level: 3, date: '2025-11-02', contributions: 8 },
    { level: 2, date: '2025-11-03', contributions: 4 },
    { level: 1, date: '2025-11-04', contributions: 1 },

    // Неделя 6
    { level: 0, date: '2025-11-05', contributions: 0 },
    { level: 1, date: '2025-11-06', contributions: 2 },
    { level: 2, date: '2025-11-07', contributions: 5 },
    { level: 3, date: '2025-11-08', contributions: 6 },
    { level: 2, date: '2025-11-09', contributions: 4 },
    { level: 1, date: '2025-11-10', contributions: 1 },
    { level: 0, date: '2025-11-11', contributions: 0 },

    // Неделя 7
    { level: 0, date: '2025-11-12', contributions: 0 },
    { level: 0, date: '2025-11-13', contributions: 0 },
    { level: 1, date: '2025-11-14', contributions: 2 },
    { level: 2, date: '2025-11-15', contributions: 3 },
    { level: 1, date: '2025-11-16', contributions: 2 },
    { level: 0, date: '2025-11-17', contributions: 0 },
    { level: 0, date: '2025-11-18', contributions: 0 },

    // Неделя 8
    { level: 2, date: '2025-11-19', contributions: 3 },
    { level: 3, date: '2025-11-20', contributions: 8 },
    { level: 4, date: '2025-11-21', contributions: 11 },
    { level: 4, date: '2025-11-22', contributions: 13 },
    { level: 3, date: '2025-11-23', contributions: 7 },
    { level: 2, date: '2025-11-24', contributions: 4 },
    { level: 1, date: '2025-11-25', contributions: 1 },

    // Неделя 9
    { level: 0, date: '2025-11-26', contributions: 0 },
    { level: 2, date: '2025-11-27', contributions: 3 },
    { level: 3, date: '2025-11-28', contributions: 6 },
    { level: 2, date: '2025-11-29', contributions: 5 },
    { level: 2, date: '2025-11-30', contributions: 4 },
    { level: 1, date: '2025-12-01', contributions: 2 },
    { level: 0, date: '2025-12-02', contributions: 0 },

    // Неделя 10
    { level: 1, date: '2025-12-03', contributions: 1 },
    { level: 2, date: '2025-12-04', contributions: 4 },
    { level: 4, date: '2025-12-05', contributions: 10 },
    { level: 3, date: '2025-12-06', contributions: 8 },
    { level: 2, date: '2025-12-07', contributions: 5 },
    { level: 1, date: '2025-12-08', contributions: 2 },
    { level: 0, date: '2025-12-09', contributions: 0 },

    // Неделя 11
    { level: 0, date: '2025-12-10', contributions: 0 },
    { level: 1, date: '2025-12-11', contributions: 1 },
    { level: 2, date: '2025-12-12', contributions: 3 },
    { level: 2, date: '2025-12-13', contributions: 4 },
    { level: 1, date: '2025-12-14', contributions: 2 },
    { level: 0, date: '2025-12-15', contributions: 0 },
    { level: 0, date: '2025-12-16', contributions: 0 },

    // Неделя 12
    { level: 2, date: '2025-12-17', contributions: 5 },
    { level: 3, date: '2025-12-18', contributions: 9 },
    { level: 4, date: '2025-12-19', contributions: 18 },
    { level: 4, date: '2025-12-20', contributions: 20 },
    { level: 3, date: '2025-12-21', contributions: 11 },
    { level: 2, date: '2025-12-22', contributions: 6 },
    { level: 1, date: '2025-12-23', contributions: 2 },

    // Неделя 13
    { level: 0, date: '2025-12-24', contributions: 0 },
    { level: 0, date: '2025-12-25', contributions: 0 },
    { level: 1, date: '2025-12-26', contributions: 1 },
    { level: 2, date: '2025-12-27', contributions: 3 },
    { level: 1, date: '2025-12-28', contributions: 2 },
    { level: 0, date: '2025-12-29', contributions: 0 },
    { level: 0, date: '2025-12-30', contributions: 0 },

    // Неделя 14
    { level: 1, date: '2025-12-31', contributions: 1 },
    { level: 2, date: '2026-01-01', contributions: 4 },
    { level: 3, date: '2026-01-02', contributions: 7 },
    { level: 3, date: '2026-01-03', contributions: 8 },
    { level: 2, date: '2026-01-04', contributions: 5 },
    { level: 1, date: '2026-01-05', contributions: 2 },
    { level: 0, date: '2026-01-06', contributions: 0 },

    // Неделя 15
    { level: 0, date: '2026-01-07', contributions: 0 },
    { level: 1, date: '2026-01-08', contributions: 2 },
    { level: 4, date: '2026-01-09', contributions: 12 },
    { level: 3, date: '2026-01-10', contributions: 9 },
    { level: 2, date: '2026-01-11', contributions: 4 },
    { level: 1, date: '2026-01-12', contributions: 1 },
    { level: 0, date: '2026-01-13', contributions: 0 },

    // Неделя 16
    { level: 0, date: '2026-01-14', contributions: 0 },
    { level: 2, date: '2026-01-15', contributions: 3 },
    { level: 3, date: '2026-01-16', contributions: 6 },
    { level: 2, date: '2026-01-17', contributions: 5 },
    { level: 1, date: '2026-01-18', contributions: 2 },
    { level: 0, date: '2026-01-19', contributions: 0 },
    { level: 0, date: '2026-01-20', contributions: 0 },

    // Неделя 17
    { level: 1, date: '2026-01-21', contributions: 2 },
    { level: 3, date: '2026-01-22', contributions: 8 },
    { level: 4, date: '2026-01-23', contributions: 14 },
    { level: 4, date: '2026-01-24', contributions: 16 },
    { level: 3, date: '2026-01-25', contributions: 10 },
    { level: 2, date: '2026-01-26', contributions: 5 },
    { level: 1, date: '2026-01-27', contributions: 2 },

    // Неделя 18
    { level: 0, date: '2026-01-28', contributions: 0 },
    { level: 1, date: '2026-01-29', contributions: 1 },
    { level: 2, date: '2026-01-30', contributions: 4 },
    { level: 2, date: '2026-01-31', contributions: 3 },
    { level: 1, date: '2026-02-01', contributions: 2 },
    { level: 0, date: '2026-02-02', contributions: 0 },
    { level: 0, date: '2026-02-03', contributions: 0 },

    // Неделя 19
    { level: 2, date: '2026-02-04', contributions: 3 },
    { level: 3, date: '2026-02-05', contributions: 7 },
    { level: 4, date: '2026-02-06', contributions: 11 },
    { level: 3, date: '2026-02-07', contributions: 8 },
    { level: 2, date: '2026-02-08', contributions: 5 },
    { level: 1, date: '2026-02-09', contributions: 1 },
    { level: 0, date: '2026-02-10', contributions: 0 },

    // Неделя 20
    { level: 0, date: '2026-02-11', contributions: 0 },
    { level: 1, date: '2026-02-12', contributions: 2 },
    { level: 2, date: '2026-02-13', contributions: 4 },
    { level: 2, date: '2026-02-14', contributions: 3 },
    { level: 1, date: '2026-02-15', contributions: 1 },
    { level: 0, date: '2026-02-16', contributions: 0 },
    { level: 0, date: '2026-02-17', contributions: 0 },

    // Неделя 21
    { level: 1, date: '2026-02-18', contributions: 2 },
    { level: 2, date: '2026-02-19', contributions: 5 },
    { level: 4, date: '2026-02-20', contributions: 13 },
    { level: 3, date: '2026-02-21', contributions: 9 },
    { level: 2, date: '2026-02-22', contributions: 6 },
    { level: 1, date: '2026-02-23', contributions: 2 },
    { level: 0, date: '2026-02-24', contributions: 0 },

    // Неделя 22
    { level: 0, date: '2026-02-25', contributions: 0 },
    { level: 3, date: '2026-02-26', contributions: 7 },
    { level: 4, date: '2026-02-27', contributions: 15 },
    { level: 4, date: '2026-02-28', contributions: 17 },
    { level: 3, date: '2026-03-01', contributions: 9 },
    { level: 2, date: '2026-03-02', contributions: 4 },
    { level: 1, date: '2026-03-03', contributions: 1 },

    // Неделя 23
    { level: 1, date: '2026-03-04', contributions: 2 },
    { level: 2, date: '2026-03-05', contributions: 4 },
    { level: 3, date: '2026-03-06', contributions: 8 },
    { level: 2, date: '2026-03-07', contributions: 5 },
    { level: 2, date: '2026-03-08', contributions: 3 },
    { level: 1, date: '2026-03-09', contributions: 1 },
    { level: 0, date: '2026-03-10', contributions: 0 },

    // Неделя 24
    { level: 0, date: '2026-03-11', contributions: 0 },
    { level: 1, date: '2026-03-12', contributions: 2 },
    { level: 4, date: '2026-03-13', contributions: 12 },
    { level: 3, date: '2026-03-14', contributions: 8 },
    { level: 2, date: '2026-03-15', contributions: 4 },
    { level: 1, date: '2026-03-16', contributions: 1 },
    { level: 0, date: '2026-03-17', contributions: 0 },

    // Неделя 25
    { level: 2, date: '2026-03-18', contributions: 5 },
    { level: 3, date: '2026-03-19', contributions: 9 },
    { level: 4, date: '2026-03-20', contributions: 19 },
    { level: 4, date: '2026-03-21', contributions: 21 },
    { level: 3, date: '2026-03-22', contributions: 10 },
    { level: 2, date: '2026-03-23', contributions: 6 },
    { level: 1, date: '2026-03-24', contributions: 2 },

    // Неделя 26 (самая свежая)
    { level: 1, date: '2026-03-25', contributions: 2 },
    { level: 2, date: '2026-03-26', contributions: 4 },
    { level: 3, date: '2026-03-27', contributions: 7 },
    { level: 4, date: '2026-03-28', contributions: 11 },
    { level: 3, date: '2026-03-29', contributions: 8 },
    { level: 2, date: '2026-03-30', contributions: 5 },
    { level: 1, date: '2026-03-31', contributions: 2 },
];

const RECENT_ACTIVITY: RecentActivity[] = [
    {
        id: '1',
        title: 'Решено: Две суммы',
        substring: 'Легко',
        icon: '✅',
        xpReward: 80,
        agoSeconds: 13000,
    },
    {
        id: '2',
        title: 'Завершено: модуль React Hooks',
        substring: 'Расширенные шаблоны React · Модуль 6',
        icon: '📚',
        xpReward: 120,
        agoSeconds: 70500,
    },
    {
        id: '3',
        title: 'Значок: Демон скорости разблокирован',
        substring: 'Решил 5 задач менее чем за 10 минут',
        icon: '🏆',
        xpReward: 200,
        agoSeconds: 720500,
    },
    {
        id: '4',
        title: 'Решено: Допустимые круглые скобки',
        substring: 'Простая · Стековая · Строка',
        icon: '⚡',
        xpReward: 80,
        agoSeconds: 32500,
    },
];

const USER_FOR_TEST: User = {
    id: '1',
    name: 'Андрей Пучков',
    bio: 'Junior Frontend разработчик',
    email: 'test@mail.ru',
    password: '123',
    socialLinks: [
        {
            title: 'GitHub',
            link: 'https://github.com',
        },
        {
            title: 'Telegram',
            link: 'https://web.telegram.com',
        },
        {
            title: 'VK',
            link: 'https://vk.com',
        },
    ],
    createdAt: new Date(),
};

export const userApi = {
    getCurrentUser: async () => {
        return Promise.resolve(USER_FOR_TEST);
    },

    getLanguagesProgress: async () => {
        return Promise.resolve(LANGUAGES_PROGRESS);
    },

    getHeatmap: async () => {
        return Promise.resolve(HEATMAP_DATA);
    },

    getRecentActivity: async () => {
        return Promise.resolve(RECENT_ACTIVITY);
    },
};
