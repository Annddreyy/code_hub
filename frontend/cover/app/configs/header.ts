type Link = {
  id: string;
  title: string;
  icon: string;
  link: `/${string}`;
};

export const links: Link[] = [
  {
    id: '1',
    title: 'Главная',
    icon: '🏠',
    link: '/',
  },
  {
    id: '2',
    title: 'Курсы',
    icon: '📚',
    link: '/cources',
  },
  {
    id: '3',
    title: 'Задачи',
    icon: '⚡',
    link: '/tasks',
  },
  {
    id: '4',
    title: 'Roadmaps',
    icon: '🗺️',
    link: '/roadmaps',
  },
  {
    id: '5',
    title: 'Таблица лидеров',
    icon: '👤',
    link: '/leaderboard',
  },
];
