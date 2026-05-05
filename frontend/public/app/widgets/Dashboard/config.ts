export type SidebarLink = {
    id: string;
    title: string;
    icon: string;
    link: `/${string}`;
};

export const SIDEBAR_LINKS: SidebarLink[] = [
    {
        id: '1',
        title: 'Дашборд',
        icon: '🏠',
        link: '/',
    },
    {
        id: '2',
        title: 'Мои курсы',
        icon: '📚',
        link: '/courses',
    },
    {
        id: '3',
        title: 'Задачи',
        icon: '⚡',
        link: '/challenges',
    },
    {
        id: '4',
        title: 'Дорожные карты',
        icon: '🗺️',
        link: '/roadmaps',
    },
    {
        id: '5',
        title: 'Таблица лидеров',
        icon: '🏆',
        link: '/leaderboard',
    },
    {
        id: '6',
        title: 'Достижения',
        icon: '🎖️',
        link: '/achievements',
    },
];
