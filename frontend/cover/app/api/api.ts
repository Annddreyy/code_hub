import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:8080/api/auth/',
    withCredentials: true,
});

export type ApiError = {
    response: {
        data: {
            message?: string;
            errors?: {
                messages: string[];
            }[];
        };
    };
};

export const userApi = {
    async getUserInfo(headers = {}) {
        return (await instance.get('me', { headers })).data;
    },

    async logout(headers = {}) {
        return (await instance.post('logout', { headers })).data;
    },
};
