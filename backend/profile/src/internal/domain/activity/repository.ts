import { pool } from '@/internal/infrastructure/db';
import camelcaseKeys from 'camelcase-keys';

export const activityRepository = {
    async getRecentActivity(userId: string) {
        const query = `
            WITH recent_activities AS (
                SELECT 
                    COALESCE(c.challenge_id, l.lesson_id) as id,
                    COALESCE(c.title, l.title) as title,
                    COALESCE(c.difficulty, l.level) as substring,
                    al.xp_earned as "xpReward",
                    EXTRACT(EPOCH FROM (NOW() - al.activity_at)) as ago_seconds,
                    al.source_type,
                    ROW_NUMBER() OVER (ORDER BY al.activity_at DESC) as rn
                FROM activity_log al
                LEFT JOIN challenge c ON al.source_type = 'challenge' AND al.source_id = c.challenge_id
                LEFT JOIN lesson l ON al.source_type = 'lesson' AND al.source_id = l.lesson_id
                WHERE al.user_id = $1
            )
            SELECT 
                id::text,
                title,
                substring,
                "xpReward",
                FLOOR(ago_seconds) as ago_seconds
            FROM recent_activities
            WHERE rn <= 4
            ORDER BY ago_seconds ASC
        `;

        const result = camelcaseKeys(await pool.query(query, [userId]));

        return result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            substring: row.substring,
            xpReward: row.xpReward,
            agoSeconds: row.agoSeconds,
        }));
    },
};
