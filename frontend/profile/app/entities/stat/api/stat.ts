import type { Stat } from '../model/stat';

const STATS_FOR_TEST: Stat[] = [
    {
        id: '1',
        title: 'Задач решено',
        value: '321',
        color: 'green',
    },
    {
        id: '2',
        title: 'Дневная полоса',
        value: '47',
        color: 'orange',
    },
    {
        id: '3',
        title: 'Заработано опыта',
        value: '18450',
        color: 'yellow',
    },
    {
        id: '4',
        title: 'Мировой ранк',
        value: 'Лучшие 3%',
        color: 'purple',
    },
    {
        id: '5',
        title: 'Достижений',
        value: '24',
        color: 'blue',
    },
];

export const statApi = {
    getStats: async () => {
        return Promise.resolve(STATS_FOR_TEST);
    },
};
