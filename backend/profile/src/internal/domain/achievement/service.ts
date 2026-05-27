import { achievementRepository } from './repository';

export const achievementService = {
    async getAchievements(userId: string, category?: string) {
        return await achievementRepository.getAchievements(userId, category);
    },
};
