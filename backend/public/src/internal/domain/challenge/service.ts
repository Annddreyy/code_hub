import { ChallengeFiltersDto } from '@/internal/api/challenge/dto';
import { challengesRepository } from './repository';

export const challengesService = {
    async getChallenges(filters: ChallengeFiltersDto, userId: string) {
        return await challengesRepository.getAllChallenges(filters, userId);
    },

    async getAllTopics() {
        return await challengesRepository.getAllTopics();
    },

    async getStats(userId: string) {
        return await challengesRepository.getChallengeStats(userId);
    }
};
