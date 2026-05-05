import type { UserChoices } from '@/types';
import { instance } from '@/shared/api';
import type { Roadmap } from '../model/roadmap';

export const roadmapsApi = {
    getRoadmaps: async (userChoices: UserChoices) => {
        return (
            await instance.post<{
                message: string;
                roadmaps: Roadmap[];
            }>('submit', userChoices)
        ).data;
    },
};
