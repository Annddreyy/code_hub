import { achievementRepository } from "../achievement"

export const activityService = {
    async getRecentActivity() {
        return await achievementRepository.getAchievements()
    }
}