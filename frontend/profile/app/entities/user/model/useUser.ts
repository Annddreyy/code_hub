import { userApi } from '../api/user';
import type { User } from './user';

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>();
    const isLoading = ref(false);
    const errorMessage = ref('');

    const getCurrentUser = async () => {
        isLoading.value = true;

        try {
            user.value = await userApi.getCurrentUser();
        } catch (err: unknown) {
            errorMessage.value = err as string;
            return;
        } finally {
            isLoading.value = true;
        }

        errorMessage.value = '';
    };

    return { user, getCurrentUser };
});
