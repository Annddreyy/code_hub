import { userRepository } from './repository';

export const userService = {
    async getAllUsers(page = 1, period = 'all') {
        return await userRepository.getUsers(page, period);
    },

    async getPodiumUsers(period = 'all') {
        return await userRepository.getTop3Users(period);
    },
};
