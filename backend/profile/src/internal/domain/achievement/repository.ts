import { pool } from '@/internal/infrastructure/db';
import camelcaseKeys from 'camelcase-keys';

export const achievementRepository = {
    async getAchievements(userId: string, category?: string) {
        const params: unknown[] = [];
        let categoryFilter = '';

        let userJoinClause = '';
        let userSelectClause = '';

        if (category) {
            categoryFilter = `AND a.category = $${params.length + 1}`;
            params.push(category);
        }

        if (userId) {
            userJoinClause = `
                LEFT JOIN user_achievement ua ON a.achievement_id = ua.achievement_id AND ua.user_id = $${params.length + 1}
            `;
            userSelectClause = `
                ua.earned_at as earned_at,
                CASE WHEN ua.earned_at IS NOT NULL THEN true ELSE false END as is_earned,
                ua.progress_json as user_progress
            `;
            params.push(userId);
        } else {
            userSelectClause = `
                NULL as earned_at,
                false as is_earned,
                NULL as user_progress
            `;
        }

        const query = `
            SELECT 
                a.achievement_id as id,
                a.slug,
                a.title,
                a.description,
                a.icon_emoji as icon,
                a.category,
                a.xp_reward as "xpReward",
                a.criteria_json as criteria,
                a.created_at as "createdAt",
                ${userSelectClause}
            FROM achievement a
            ${userJoinClause}
            WHERE 1=1
            ${categoryFilter}
            ORDER BY 
                CASE a.category
                    WHEN 'common' THEN 1
                    WHEN 'rare' THEN 2
                    WHEN 'epic' THEN 3
                    WHEN 'legendary' THEN 4
                    ELSE 5
                END,
                a.achievement_id
        `;

        const result = camelcaseKeys(await pool.query(query, params), { deep: true });

        return result.rows.map((row) => ({
            id: row.id,
            slug: row.slug,
            title: row.title,
            description: row.description,
            icon: row.icon,
            category: row.category,
            xpReward: row.xpReward,
            criteria: row.criteria,
            createdAt: row.createdAt,
            userMeta: userId
                ? {
                      earnedDate: row.earnedAt,
                  }
                : null,
        }));
    },
};
