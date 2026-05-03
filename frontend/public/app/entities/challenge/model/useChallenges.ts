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
    const totalCount = ref(0);
    const pageSize = ref(20);

    const isLoading = ref(false);
    const errorMessage = ref('');

    const getChallenges = async (filters: Filters = {}, headers = {}) => {
        isLoading.value = true;

        try {
            const response = await challengesApi.getChallenges(filters, headers);
            challenges.value = response.challenges;
            totalCount.value = response.totalCount;
            pageSize.value = response.pageSize;
            return response;
        } catch (err: unknown) {
            errorMessage.value = err as string;
        } finally {
            isLoading.value = false;
        }

        return null;
    };

    return { challenges, getChallenges };
});
