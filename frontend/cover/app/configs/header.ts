type Link = {
  id: string;
  title: string;
  link: `/${string}`;
};

export const links: Link[] = [
  {
    id: '1',
    title: 'Главная',
    link: '/',
  },
  {
    id: '2',
    title: 'Курсы',
    link: '/cources',
  },
  {
    id: '3',
    title: 'Задачи',
    link: '/tasks',
  },
  {
    id: '4',
    title: 'Roadmaps',
    link: '/roadmaps',
  },
  {
    id: '5',
    title: 'Таблица лидеров',
    link: '/leaderboard',
  },
];
