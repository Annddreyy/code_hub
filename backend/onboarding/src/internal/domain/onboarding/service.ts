import { onboardingRepository } from './repository';
import { OnboardingData } from './onboarding';

export const onboardingService = {
    async getAvailableGoals() {
        try {
            return await onboardingRepository.getAllGoals();
        } catch {
            throw new Error('Не удалось загрузить список целей');
        }
    },
    
    async getAvailableLanguages() {
        try {
            return await onboardingRepository.getAllLanguages();
        } catch {
            throw new Error('Не удалось загрузить список языков');
        }
    },
    
    async getAvailableExperienceLevels() {
        try {
            return await onboardingRepository.getAllExperienceLevels();
        } catch {
            throw new Error('Не удалось загрузить список уровней опыта');
        }
    },

    async submitOnboardingData(onboardingData: OnboardingData) {
        if (!onboardingData.goals || !onboardingData.goals.length) {
            throw new Error('Необходимо выбрать хотя бы одну цель');
        }
        
        if (!onboardingData.languages || !onboardingData.languages.length) {
            throw new Error('Необходимо выбрать хотя бы один язык');
        }
        
        if (!onboardingData.experienceLevels || !onboardingData.experienceLevels.length) {
            throw new Error('Необходимо выбрать хотя бы один уровень опыта');
        }
        

        try {
            return await onboardingRepository.getRoadmaps();
        } catch {
            throw new Error('Не удалось загрузить roadmaps');
        }
    },
};