import { instance } from '@/shared/api';
import type { Language } from '../model/language';

export const languageApi = {
    getLanguages: async () => {
        return (await instance.get<Language[]>('languages')).data;
    },
};
