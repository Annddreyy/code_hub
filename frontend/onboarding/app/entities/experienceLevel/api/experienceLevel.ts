import type { ExperienceLevel } from '../model/experienceLevel';

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: '1',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
    title: 'Новичок',
    description: 'Какое-то там описание',
    difficulty: 3,
  },
  {
    id: '1',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
    title: 'Новичок',
    description: 'Какое-то там описание',
    difficulty: 3,
  },
  {
    id: '1',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/960px-Python-logo-notext.svg.png',
    title: 'Новичок',
    description: 'Какое-то там описание',
    difficulty: 3,
  },
];

export const experienceLevelApi = {
  getExperienceLevel: () => {
    return Promise.resolve(EXPERIENCE_LEVELS);
  },
};
