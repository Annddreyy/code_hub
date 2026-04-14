import type { Roadmap } from '../model/roadmap';

const ROADMAPS: Roadmap[] = [
  {
    id: '1',
    title: 'React',
    icon: '⚛️',
    xp: 2500,
  },
  {
    id: '1',
    title: 'React',
    icon: '⚛️',
    xp: 2500,
  },
  {
    id: '1',
    title: 'React',
    icon: '⚛️',
    xp: 2500,
  },
];

export const roadmapsApi = {
  getRoadmaps: () => {
    return Promise.resolve(ROADMAPS);
  },
};
