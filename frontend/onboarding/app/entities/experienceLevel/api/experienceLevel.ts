import { instance } from '@/shared/api';
import type { ExperienceLevel } from '../model/experienceLevel';

export const experienceLevelApi = {
    getExperienceLevels: async () => {
        return (await instance.get<ExperienceLevel[]>('experience-levels')).data;
    },
};
