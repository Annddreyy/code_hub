import camelcaseKeys from 'camelcase-keys';
import {
    ChallengeFiltersDto,
    ChallengeStatsResponseDto,
    STATUS,
} from '@/internal/api/challenge/dto';
import { pool } from '@/internal/infrastructure/db';
import { GET_ALL_TOPICS_QUERY, GET_CHALLENGES_STATS_QUERY } from './dbQueries';

export const challengesRepository = {
    async getAllChallenges(filters: ChallengeFiltersDto, userId: string) {
        const whereClauses: string[] = [];
        const params: unknown[] = [];

        if (filters?.title) {
            whereClauses.push(`challenge.title ILIKE $${params.length + 1}`);
            params.push(`%${filters.title}%`);
        }

        if (filters?.difficulty) {
            whereClauses.push(`challenge.difficulty = $${params.length + 1}`);
            params.push(filters.difficulty);
        }

        if (filters?.topics && filters.topics.length) {
            whereClauses.push(`
                EXISTS (
                    SELECT 1 
                    FROM challenge_topic_map ctm
                    JOIN challenge_topic ct ON ct.challenge_topic_id = ctm.topic_id
                    WHERE ctm.challenge_id = challenge.id 
                    AND ct.name = ANY($${params.length + 1}::text[])
                )
            `);
            params.push(filters.topics);
        }

        let hasStatusFilter = false;
        let statusFilterCondition = '';

        if (filters?.statuses?.length && userId) {
            hasStatusFilter = true;
            const includesTodo = filters.statuses.includes(STATUS.TODO);
            const otherStatuses = filters.statuses.filter((s) => s !== 'todo');

            if (includesTodo && otherStatuses.length > 0) {
                statusFilterCondition = `(user_challenge.user_id IS NULL OR user_challenge.status = ANY($${params.length + 1}))`;
                params.push(otherStatuses);
            } else if (includesTodo && otherStatuses.length === 0) {
                statusFilterCondition = `user_challenge.user_id IS NULL`;
            } else {
                statusFilterCondition = `user_challenge.status = ANY($${params.length + 1})`;
                params.push(filters.statuses);
            }
        }

        let countQuery = `
            SELECT COUNT(DISTINCT challenge.id) as total 
            FROM challenge
        `;

        const countParams = [...params];

        if (userId) {
            countQuery += ` LEFT JOIN user_challenge ON user_challenge.challenge_id = challenge.id AND user_challenge.user_id = $${countParams.length + 1} `;
            countParams.push(userId);
        }

        if (whereClauses.length || hasStatusFilter) {
            const allConditions = [];
            if (whereClauses.length) {
                allConditions.push(whereClauses.join(' AND '));
            }
            if (hasStatusFilter && statusFilterCondition) {
                allConditions.push(statusFilterCondition);
            }
            countQuery += ` WHERE ${allConditions.join(' AND ')} `;
        }

        const countResult = await pool.query<{ total: string }>(countQuery, countParams);
        const total = parseInt(countResult.rows[0]?.total || '0', 10);

        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        let query = `
            SELECT 
                challenge.*,
                COALESCE(
                    JSONB_AGG(
                        DISTINCT JSONB_BUILD_OBJECT(
                            'id', challenge_topic.challenge_topic_id,
                            'slug', challenge_topic.slug,
                            'name', challenge_topic.name,
                            'colorHex', challenge_topic.color_hex
                        )
                    ) FILTER (WHERE challenge_topic.challenge_topic_id IS NOT NULL),
                    '[]'::jsonb
                ) as topics
        `;

        if (userId) {
            query += `, user_challenge.status as user_status `;
        }

        query += `
            FROM challenge
            LEFT JOIN challenge_topic_map ON challenge_topic_map.challenge_id = challenge.id
            LEFT JOIN challenge_topic ON challenge_topic.challenge_topic_id = challenge_topic_map.topic_id
        `;

        const dataParams = [...params];

        if (userId) {
            query += ` LEFT JOIN user_challenge ON user_challenge.challenge_id = challenge.id AND user_challenge.user_id = $${dataParams.length + 1} `;
            dataParams.push(userId);
        }

        if (whereClauses.length || hasStatusFilter) {
            const allConditions = [];
            if (whereClauses.length) {
                allConditions.push(whereClauses.join(' AND '));
            }
            if (hasStatusFilter && statusFilterCondition) {
                allConditions.push(statusFilterCondition);
            }
            query += ` WHERE ${allConditions.join(' AND ')} `;
        }

        query += `
            GROUP BY challenge.id ${userId ? ', user_challenge.status' : ''}
            ORDER BY challenge.id
            LIMIT $${dataParams.length + 1} OFFSET $${dataParams.length + 2}
        `;

        dataParams.push(limit, offset);

        const result = await pool.query(query, dataParams);
        const rows = camelcaseKeys(result.rows, { deep: true });
        

        console.log(total, limit)

        return {
            challenges: rows?.map((row) => ({
                id: String(row.id),
                title: row.title,
                difficulty: row.difficulty,
                topics: row.topics?.map((topic: any) => topic.name) || [],
                xpReward: row.xpReward,
                themes: row.themes,
                status: row.userStatus || 'todo',
            })),
            totalCount: total,
            pageSize: limit,
        };
    },

    async getAllTopics() {
        const result = await pool.query(GET_ALL_TOPICS_QUERY);
        const rows = camelcaseKeys(result.rows, { deep: true });
        return rows.map((row) => row.name);
    },

    async getChallengeStats(userId: string) {
        const result = await pool.query<ChallengeStatsResponseDto>(GET_CHALLENGES_STATS_QUERY, [
            userId,
        ]);
        const rows = camelcaseKeys(result.rows, { deep: true });

        return {
            completedCount: rows[0]?.completedCount,
            pendingCount: rows[0]?.pendingCount,
            hardCount: rows[0]?.hardCount,
            mediumCount: rows[0]?.mediumCount,
            easyCount: rows[0]?.easyCount,
            totalCount: rows[0]?.totalCount,
            completionPercentage: rows[0]?.completionPercentage,
        };
    },
};
