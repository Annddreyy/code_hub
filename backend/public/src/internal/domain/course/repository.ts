import camelcaseKeys from 'camelcase-keys';
import { pool } from '@/internal/infrastructure/db';
import {
    CoursesFiltersDto,
    TechnologiesResponseDto,
    TagsResponseDto,
} from '@/internal/api/course/dto';
import { Course } from './course';
import { GET_TAGS_QUERY, GET_TECHNOLOGIES_QUERY } from './dbQueries';

export const coursesRepository = {
    async getAllCourses(filters: CoursesFiltersDto, userId: string) {
        const whereClauses: string[] = [];
        const params: unknown[] = [];

        const inProgressCountParams: unknown[] = [];

        if (filters?.inProgress && userId) {
            whereClauses.push(`
                id IN (
                    SELECT DISTINCT course_id 
                    FROM user_lesson_progress 
                    WHERE user_id = $${params.length + 1}
                )
            `);
            params.push(userId);
            inProgressCountParams.push(userId);
        }

        if (filters?.searchString) {
            whereClauses.push(`title LIKE $${params.length + 1}`);
            params.push(`%${filters.searchString}%`);
        }

        if (filters?.difficulties?.length) {
            whereClauses.push(`difficulty = ANY($${params.length + 1})`);
            params.push(filters.difficulties);
        }

        if (filters?.categories?.length) {
            whereClauses.push(`tags && $${params.length + 1}::text[]`);
            params.push(filters.categories);
        }

        if (filters?.technologies?.length) {
            whereClauses.push(`technologies && $${params.length + 1}::text[]`);
            params.push(filters.technologies);
        }

        const whereClause = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';

        let orderByClause = ' ORDER BY id ASC';
        if (filters?.sortBy) {
            switch (filters.sortBy) {
                case 'easy-hard':
                    orderByClause = ' ORDER BY difficulty DESC';
                    break;
                case 'hard-easy':
                    orderByClause = ' ORDER BY difficulty ASC';
                    break;
                case 'newest':
                    orderByClause = ' ORDER BY created_at DESC';
                    break;
                case 'oldest':
                    orderByClause = ' ORDER BY created_at ASC';
                    break;
            }
        }

        const totalCoursesQuery = `SELECT COUNT(*) as total FROM course`;
        const totalCoursesResult = await pool.query<{ total: string }>(totalCoursesQuery);
        const totalCoursesCount = parseInt(totalCoursesResult.rows[0]?.total || '0', 10);

        let inProgressCoursesCount = 0;
        if (userId) {
            const inProgressQuery = `
                SELECT COUNT(DISTINCT course_id) as total 
                FROM user_lesson_progress 
                WHERE user_id = $1
            `;
            const inProgressResult = await pool.query<{ total: string }>(inProgressQuery, [userId]);
            inProgressCoursesCount = parseInt(inProgressResult.rows[0]?.total || '0', 10);
        }

        const countQuery = `SELECT COUNT(*) as total FROM course ${whereClause}`;
        const countResult = await pool.query<{ total: string }>(countQuery, params);
        const filteredTotal = parseInt(countResult.rows[0]?.total || '0', 10);

        const page = filters?.page && filters.page > 0 ? filters.page : 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const query = `
            SELECT * FROM course 
            ${whereClause}
            ${orderByClause}
            LIMIT $${params.length + 1} OFFSET $${params.length + 2}
        `;

        const dataParams = [...params, limit, offset];

        const { rows } = camelcaseKeys(await pool.query<Course>(query, dataParams), { deep: true });

        return {
            courses: rows?.map((row) => ({
                id: row.id,
                title: row.title,
                difficulty: row.difficulty,
                description: row.description,
                tags: row.tags,
                icon: row.icon,
                estimatedHours: row.estimatedHours,
            })),
            totalCount: filteredTotal,
            pageSize: limit,
            totalCoursesCount: totalCoursesCount,
            inProgressCoursesCount: inProgressCoursesCount,
        };
    },

    async getAllTags() {
        const { rows } = camelcaseKeys(await pool.query<TagsResponseDto>(GET_TAGS_QUERY));

        return rows;
    },

    async getAllTechnologies() {
        const { rows } = camelcaseKeys(
            await pool.query<TechnologiesResponseDto>(GET_TECHNOLOGIES_QUERY),
        );

        return rows;
    },
};
