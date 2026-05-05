import { instance } from '@/shared/api';
import type { Goal } from '../model/goal';

export const goalApi = {
    getGoals: async () => {
        return (await instance.get<Goal[]>('goals')).data;
    },
};
