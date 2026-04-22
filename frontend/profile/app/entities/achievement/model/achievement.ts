export enum Category {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary',
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    xpReward: number;
    category: Category;
    userMeta: {
        earnedDate?: Date;
    };
}

export const CATEGORY_TITLES: {
    title: Category;
    fullTitle: string;
}[] = [
    {
        title: Category.COMMON,
        fullTitle: 'Обычное',
    },
    {
        title: Category.RARE,
        fullTitle: 'Редкое',
    },
    {
        title: Category.EPIC,
        fullTitle: 'Эпическое',
    },
    {
        title: Category.LEGENDARY,
        fullTitle: 'Легендарное',
    },
];
