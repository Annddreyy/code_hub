import { userApi } from '../api/user';
import type { User } from './user';

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<User>({
        id: '',
        name: '',
        avatarUrl: '',
        position: {
            prevPosition: 0,
            currentPositon: 0,
        },
        xp: 0,
        challengesSolved: 0,
        streak: 0,
    });
    const isLoading = ref(false);
    const errorMessage = ref('');

    const getCurrentUser = async () => {
        isLoading.value = true;

        try {
            currentUser.value = await userApi.getCurrentUser();
            return currentUser.value;
        } catch (err: unknown) {
            errorMessage.value = err as string;
        } finally {
            isLoading.value = false;
        }
    };

    return { currentUser, getCurrentUser };
});
