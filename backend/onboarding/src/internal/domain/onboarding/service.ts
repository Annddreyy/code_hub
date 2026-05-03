import { onboardingRepository } from './repository';
import { OnboardingData } from './onboarding';

export const onboardingService = {
    async getAvailableGoals() {
        return await onboardingRepository.getAllGoals();
    },

    async getAvailableLanguages() {
        return await onboardingRepository.getAllLanguages();
    },

    async getAvailableExperienceLevels() {
        return await onboardingRepository.getAllExperienceLevels();
    },

    async submitOnboardingData(_onboardingData: OnboardingData) {
        return await onboardingRepository.getRoadmaps();
    },
};
