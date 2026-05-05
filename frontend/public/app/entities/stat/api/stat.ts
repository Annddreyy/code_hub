import type { Stat } from '../model/stat';

export type DailyGoal = {
    icon: string;
    title: string;
    currentResult: number;
    goal: number;
};

const STATS_TEST: Stat[] = [
    {
        id: 'total-xp',
        title: '100',
        description: 'Общий опыт',
        icon: '⚡',
        color: 'blue',
        userMeta: {
            prevCount: 80,
            currentCount: 100,
        },
    },
    {
        id: 'tasks-solved',
        title: '200',
        description: 'Задач решено',
        icon: '✅',
        color: 'green',
        userMeta: {
            prevCount: 196,
            currentCount: 200,
        },
    },
    {
        id: 'lessons-completed',
        title: '200',
        color: 'purple',
        description: 'Уроков пройдено',
        icon: '📖',
        userMeta: {
            prevCount: 188,
            currentCount: 200,
        },
    },
    {
        id: 'world-rank',
        title: '#12',
        description: 'Мировой ранг',
        color: 'yellow',
        icon: '🏆',
        userMeta: {
            prevCount: 22,
            currentCount: 12,
        },
    },
];

const DAY_GOAL_TEST: DailyGoal[] = [
    {
        icon: '📖',
        title: 'Уроки',
        currentResult: 12,
        goal: 24,
    },
    {
        icon: '⚡',
        title: 'Задачи',
        currentResult: 15,
        goal: 20,
    },
    {
        icon: '⏱️',
        title: 'Время',
        currentResult: 15,
        goal: 20,
    },
];

export const statApi = {
    getStats: async () => {
        return Promise.resolve(STATS_TEST);
    },

    getDayGoal: async () => {
        return Promise.resolve(DAY_GOAL_TEST);
    },
};
