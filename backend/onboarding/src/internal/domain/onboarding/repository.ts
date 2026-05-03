import camelcaseKeys from 'camelcase-keys';
import { pool } from '@/internal/infrastructure/db';
import { Goal, Language, ExperienceLevel, Roadmap } from './onboarding';
import {
    GET_ALL_EXPERIENCE_LEVELS_QUERY,
    GET_ALL_GOALS_QUERY,
    GET_ALL_LANGUAGES_QUERY,
    GET_ROADMAPS_RESULT_QUERY,
} from './dbQueries';

export const onboardingRepository = {
    async getAllGoals(): Promise<Goal[]> {
        const { rows } = await pool.query<Goal>(GET_ALL_GOALS_QUERY);

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            icon: row.icon,
            description: row.description,
            tag: row.tag,
        }));
    },

    async getAllLanguages(): Promise<Language[]> {
        const { rows } = camelcaseKeys(await pool.query<Language>(GET_ALL_LANGUAGES_QUERY), {
            deep: true,
        });

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            icon: row.icon,
            usageAreas: row.usageAreas,
        }));
    },

    async getAllExperienceLevels(): Promise<ExperienceLevel[]> {
        const { rows } = await pool.query<ExperienceLevel>(GET_ALL_EXPERIENCE_LEVELS_QUERY);

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            icon: row.icon,
            description: row.description,
            difficulty: row.difficulty,
        }));
    },

    async getRoadmaps(): Promise<Roadmap[]> {
        const { rows } = camelcaseKeys(await pool.query<Roadmap>(GET_ROADMAPS_RESULT_QUERY));

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            icon: row.icon,
        }));
    },
};
