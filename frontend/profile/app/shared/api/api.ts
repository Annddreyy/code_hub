import axios from 'axios';

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

export const instance = axios.create({
    baseURL: 'http://localhost:8080/api/profile/',
    withCredentials: true,
});

export const authInstance = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
    failedQueue = [];
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('auth/refresh')
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => instance(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const cookieHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};
                await axios
                    .create({ baseURL: 'http://localhost:8080', withCredentials: true })
                    .post('/api/auth/refresh', { cookieHeaders });
                processQueue(null);
                return instance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
