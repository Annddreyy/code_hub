import { instance } from '@/shared/api';
import type { Settings } from '../model/settings';

export const settingsApi = {
    getSettings: async (headers = {}) => {
        return (await instance.get<Settings>('settings', { headers })).data;
    },

    updateSettings: async (settings: Partial<Settings>, headers = {}) => {
        return (await instance.patch<Settings>('settings', settings, { headers })).data;
    },
};
