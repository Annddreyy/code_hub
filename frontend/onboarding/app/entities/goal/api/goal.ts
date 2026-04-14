import type { Goal } from '../model/goal';

const GOALS: Goal[] = [
    {
        id: '1',
        title: 'Найти работу',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        description: 'Какое-то там описание',
        tag: 'Test',
    },
    {
        id: '1',
        title: 'Найти работу',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        description: 'Какое-то там описание',
        tag: 'Test',
    },
    {
        id: '1',
        title: 'Найти работу',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        description: 'Какое-то там описание',
        tag: 'Test',
    },
    {
        id: '1',
        title: 'Найти работу',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        description: 'Какое-то там описание',
        tag: 'Test',
    },
    {
        id: '1',
        title: 'Найти работу',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        description: 'Какое-то там описание',
        tag: 'Test',
    },
];

export const goalApi = {
    getGoals: () => {
        return Promise.resolve(GOALS);
    },
};
