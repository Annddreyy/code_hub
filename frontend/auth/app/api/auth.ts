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

export const authApi = {
    login: async (email: string, password: string) => {
        return await instance.post<{ message: string }>('login', { email, password });
    },
    register: async (name: string, email: string, password: string) => {
        return await instance.post<{ message: string }>('register', { name, email, password });
    },
};
