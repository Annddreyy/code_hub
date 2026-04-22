import { challengesApi, type Filters } from '../api/challenge';
import type { Challenge, Difficulty } from './challenge';

export const DIFFICULTY_TITLES: {
    value: Difficulty;
    title: string;
    titleMany: string;
}[] = [
    {
        value: 'easy',
        title: 'Легкая',
        titleMany: 'Легкие',
    },
    {
        value: 'medium',
        title: 'Средняя',
        titleMany: 'Средние',
    },
    {
        value: 'hard',
        title: 'Сложная',
        titleMany: 'Сложные',
    },
];

export const useChallengesStore = defineStore('challenges', () => {
    const challenges = ref<Challenge[]>([]);
    const isLoading = ref(false);
    const errorMessage = ref('');

    const getChallenges = async (filters: Filters = {}) => {
        isLoading.value = true;

        try {
            challenges.value = await challengesApi.getChallenges(filters);
        } catch (err: unknown) {
            errorMessage.value = err as string;
        } finally {
            isLoading.value = false;
        }
    };

    return { challenges, getChallenges };
});
