import { settingsRepository } from './repository';

export const settingsService = {
    async getSettings(userId: number) {
        return await settingsRepository.getSettings(userId);
    },

    async updateSettings(
        userId: number,
        settings: {
            editorTheme?: string;
            defaultLanguage?: string;
            editorFontSize?: number;
            enableAnimations?: boolean;
            dailyGoal?: number;
        },
    ) {
        return await settingsRepository.updateSettings(userId, settings);
    },
};
