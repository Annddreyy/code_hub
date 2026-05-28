import { pool } from '@/internal/infrastructure/db';
import camelcaseKeys from 'camelcase-keys';

export const settingsRepository = {
    async getSettings(userId: number) {
        const query = `SELECT editor_theme, default_language, editor_font_size, enable_animations, daily_goal FROM user_settings WHERE user_id = $1`;

        const result = camelcaseKeys(await pool.query(query, [userId]), { deep: true });
        return result.rows[0];
    },

    async updateSettings(userId: number, settings: {
        editorTheme?: string;
        defaultLanguage?: string;
        editorFontSize?: number;
        enableAnimations?: boolean;
        dailyGoal?: number | null;
    }) {
        const query = `
            UPDATE user_settings SET
                editor_theme = $2,
                default_language = $3,
                editor_font_size = $4,
                enable_animations = $5,
                daily_goal = $6
            WHERE user_id = $1
            RETURNING *
        `;

        const result = camelcaseKeys(await pool.query(query, [
            userId,
            settings.editorTheme,
            settings.defaultLanguage,
            settings.editorFontSize,
            settings.enableAnimations,
            settings.dailyGoal,
        ]), { deep: true });

        return result.rows[0];
    },
};
