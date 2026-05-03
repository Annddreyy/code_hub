import { pool } from '@/internal/infrastructure/db';

export const userRepository = {
    async getTop3Users(period: string) {
        const limit = 3;
        const offset = 0;

        let dateFilter = '';
        const params: unknown[] = [];

        switch (period) {
            case 'week':
                dateFilter = `AND x.earned_at >= NOW() - INTERVAL '7 days'`;
                break;
            case 'month':
                dateFilter = `AND x.earned_at >= NOW() - INTERVAL '30 days'`;
                break;
            case 'all':
            default:
                dateFilter = '';
                break;
        }

        const query = `
            WITH user_xp_summary AS (
                SELECT 
                    u.id,
                    u.name,
                    COALESCE(SUM(x.amount), 0) as total_xp,
                    COUNT(DISTINCT CASE 
                        WHEN x.source_type = 'challenge_completed' THEN x.user_xp_log_id 
                    END) as solved_count,
                    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(x.amount), 0) DESC) as position
                FROM "user" u
                LEFT JOIN user_xp_log x ON u.id = x.user_id ${dateFilter ? `AND ${dateFilter.substring(4)}` : ''}
                GROUP BY u.id, u.name
            ),
            user_streak_summary AS (
                SELECT 
                    user_id,
                    longest_streak as streak
                FROM user_streak
            )
            SELECT 
                uxs.id,
                uxs.name,
                uxs.total_xp as xp,
                uxs.solved_count as solved,
                uxs.position,
                COALESCE(uss.longest_streak, 0) as streak
            FROM user_xp_summary uxs
            LEFT JOIN user_streak uss ON uxs.id = uss.user_id
            ORDER BY uxs.position
            LIMIT $1 OFFSET $2
        `;

        params.push(limit, offset);

        const result = await pool.query(query, params);

        return result.rows.map((row) => ({
            position: row.position,
            name: row.name,
            xp: row.xp,
            solved: row.solved,
            streak: row.streak,
        }));
    },

    async getUsers(page: number, period: string) {
        const limit = 10;
        const offset = (page - 1) * limit + 3;

        let dateFilter = '';
        const params: unknown[] = [];

        switch (period) {
            case 'week':
                dateFilter = `AND x.earned_at >= NOW() - INTERVAL '7 days'`;
                break;
            case 'month':
                dateFilter = `AND x.earned_at >= NOW() - INTERVAL '30 days'`;
                break;
            case 'all':
            default:
                dateFilter = '';
                break;
        }

        const query = `
            WITH user_xp_summary AS (
                SELECT 
                    u.id,
                    u.name,
                    COALESCE(SUM(x.amount), 0) as total_xp,
                    COUNT(DISTINCT CASE 
                        WHEN x.source_type = 'challenge_completed' THEN x.user_xp_log_id 
                    END) as solved_count,
                    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(x.amount), 0) DESC) as position
                FROM "user" u
                LEFT JOIN user_xp_log x ON u.id = x.user_id ${dateFilter ? `AND ${dateFilter.substring(4)}` : ''}
                GROUP BY u.id, u.name
            ),
            user_streak_summary AS (
                SELECT 
                    user_id,
                    longest_streak as streak
                FROM user_streak
            )
            SELECT 
                uxs.id,
                uxs.name,
                uxs.total_xp as xp,
                uxs.solved_count as solved,
                uxs.position,
                COALESCE(uss.longest_streak, 0) as streak
            FROM user_xp_summary uxs
            LEFT JOIN user_streak uss ON uxs.id = uss.user_id
            WHERE uxs.position > 3
            ORDER BY uxs.position
            LIMIT $1 OFFSET $2
        `;

        params.push(limit, offset);

        const countQuery = `
            WITH user_xp_summary AS (
                SELECT 
                    u.id,
                    COALESCE(SUM(x.amount), 0) as total_xp,
                    ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(x.amount), 0) DESC) as position
                FROM "user" u
                LEFT JOIN user_xp_log x ON u.id = x.user_id ${dateFilter ? `AND ${dateFilter.substring(4)}` : ''}
                GROUP BY u.id
            )
            SELECT COUNT(*) as total
            FROM user_xp_summary
            WHERE position > 3
        `;

        const [usersResult, countResult] = await Promise.all([
            pool.query(query, params),
            pool.query(countQuery),
        ]);

        const total = parseInt(countResult.rows[0]?.total || '0', 10);

        return {
            users: usersResult.rows.map((row) => ({
                position: row.position,
                name: row.name,
                xp: row.xp,
                solved: row.solved,
                streak: row.streak,
            })),
            totalCount: total,
            pageSize: limit,
        };
    },
};
