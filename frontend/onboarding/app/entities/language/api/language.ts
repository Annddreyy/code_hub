import type { Language } from '../model/language';

const LANGUAGES: Language[] = [
    {
        id: '1',
        title: 'Python',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        usageAreas: ['Data', 'AI', 'ML'],
    },
    {
        id: '2',
        title: 'JS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        usageAreas: ['Data', 'AI', 'ML'],
    },
    {
        id: '3',
        title: 'JS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        usageAreas: ['Data', 'AI', 'ML'],
    },
    {
        id: '4',
        title: 'JS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        usageAreas: ['Data', 'AI', 'ML'],
    },
    {
        id: '5',
        title: 'JS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        usageAreas: ['Data', 'AI', 'ML'],
    },
    {
        id: '6',
        title: 'JS',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
        usageAreas: ['Data', 'AI', 'ML'],
    },
];

export const languageApi = {
    getLanguages: () => {
        return Promise.resolve(LANGUAGES);
    },
};
