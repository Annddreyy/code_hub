import { userApi } from '../api/user';
import type { User } from './user';

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>();
    const isLoading = ref(false);
    const errorMessage = ref('');

    const getCurrentUser = async (headers = {}) => {
        isLoading.value = true;

        try {
            user.value = await userApi.getCurrentUser(headers);
        } catch (err: unknown) {
            errorMessage.value = err as string;
            return;
        } finally {
            isLoading.value = false;
        }

        errorMessage.value = '';
    };

    return { user, getCurrentUser };
});
