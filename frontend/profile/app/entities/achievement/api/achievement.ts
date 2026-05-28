import { instance } from '@/shared/api';
import type { Achievement, Category } from '../model/achievement';

export const achievementsApi = {
    getAchievements: async (category: Category | undefined, headers = {}) => {
        const queryString = category ? `?category=${category}` : '';
        return (await instance.get<Achievement[]>(`achievements${queryString}`, { headers })).data;
    },
};
