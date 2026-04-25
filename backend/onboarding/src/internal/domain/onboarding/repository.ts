import camelcaseKeys from 'camelcase-keys';
import { pool } from '@/internal/infrastructure/db';
import { Goal, Language, ExperienceLevel, Roadmap } from './onboarding';

export const onboardingRepository = {
    async getAllGoals(): Promise<Goal[]> {
        const { rows } = await pool.query<Goal>('SELECT * FROM goals');

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            icon: row.icon,
            description: row.description,
            tag: row.tag,
        }));
    },

    async getAllLanguages(): Promise<Language[]> {
        const { rows } = camelcaseKeys(await pool.query<Language>('SELECT * FROM languages'), {
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
        const { rows } = await pool.query<ExperienceLevel>('SELECT * FROM experience_levels');

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            icon: row.icon,
            description: row.description,
            difficulty: row.difficulty,
        }));
    },

    async getRoadmaps(): Promise<Roadmap[]> {
        const { rows } = camelcaseKeys(await pool.query<Roadmap & { roadmapId: string}>('SELECT * FROM roadmap LIMIT 10'));

        return rows.map((row) => ({
            id: row.roadmapId,
            title: row.title,
            icon: row.icon,
        }));
    },
};
