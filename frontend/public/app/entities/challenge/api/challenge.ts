import { instance } from '@/shared/api';
import type { Challenge, Difficulty, Status } from '../model/challenge';

export type Filters = {
    topics?: string[];
    statuses?: Status[];
    inProgress?: boolean;
    difficulty?: Difficulty;
    title?: string;
    page?: number;
};

type ChallengesResponse = {
    challenges: Challenge[];
    totalCount: number;
    pageSize: number;
};

export type StatsResponse = {
    completedCount: number;
    pendingCount: number;
    hardCount: number;
    mediumCount: number;
    easyCount: number;
    totalCount: number;
    completionPercentage: number;
};

export const challengesApi = {
    getChallenges: async (filters: Filters, headers = {}) => {
        return (await instance.post<ChallengesResponse>('challenges', filters, { headers })).data;
    },

    getTopics: async (headers = {}) => {
        return (await instance.get<string[]>('challenges/topics', { headers })).data;
    },

    getStats: async (headers = {}) => {
        return (await instance.get<StatsResponse>('challenges/stats', { headers })).data;
    },
};
