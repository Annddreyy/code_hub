import camelcaseKeys from 'camelcase-keys';
import { pool } from '@/internal/infrastructure/db';
import { EmailConfirmationValidator, JwtDataValidator, UserRole } from './user';
import {
    CLEAR_REFRESH_TOKEN_QUERY,
    CREATE_USER_QUERY,
    FIND_BY_EMAIL_QUERY,
    FIND_BY_ID_QUERY,
    mapRow,
    SAVE_PASSWORD_RESET_CODE_QUERY,
    SAVE_REFRESH_TOKEN_QUERY,
    UPDATE_PASSWORD_HASH_QUERY,
    UPDATE_USER_QUERY,
    UserTableRow,
} from './dbQueries';

export const userRepository = {
    async createUser(data: {
        name: string;
        email: string;
        role: UserRole;
        createdAt: number;
        jwtData: JwtDataValidator;
        emailConfirmation: EmailConfirmationValidator;
        avatarUrl?: string;
        bio?: string;
        location?: string;
        updatedAt?: number;
    }) {
        const result = await pool.query(CREATE_USER_QUERY, [
            data.name,
            data.email,
            data.role,
            data.createdAt,
            data.updatedAt ?? data.createdAt,
            data.jwtData.passwordHash,
            data.jwtData.passwordSalt,
            data.emailConfirmation.confirmationCode,
            new Date(data.emailConfirmation.expirationDate),
            data.emailConfirmation.isConfirmed,
            data.avatarUrl ?? null,
            data.bio ?? null,
            data.location ?? null,
        ]);

        return result.rows[0].id;
    },

    async findByEmail(email: string) {
        const { rows } = camelcaseKeys(
            await pool.query<UserTableRow>(FIND_BY_EMAIL_QUERY, [email]),
            {
                deep: true,
            },
        );
        return rows[0] ? mapRow(rows[0]) : null;
    },

    async findById(id: string) {
        const { rows } = camelcaseKeys(await pool.query<UserTableRow>(FIND_BY_ID_QUERY, [id]), {
            deep: true,
        });

        return rows ? mapRow(rows[0]) : null;
    },

    async updateConfirmation(id: string) {
        const { rowCount } = await pool.query(UPDATE_USER_QUERY, [id]);
        return (rowCount ?? 0) > 0;
    },

    async saveRefreshToken(userId: string, token: string) {
        await pool.query(SAVE_REFRESH_TOKEN_QUERY, [token, userId]);
    },

    async clearRefreshToken(userId: string) {
        await pool.query(CLEAR_REFRESH_TOKEN_QUERY, [userId]);
    },

    async updatePasswordHash(userId: string, passwordHash: string, passwordSalt: string) {
        const { rowCount } = await pool.query(UPDATE_PASSWORD_HASH_QUERY, [
            passwordHash,
            passwordSalt,
            userId,
        ]);
        return (rowCount ?? 0) > 0;
    },

    async savePasswordResetCode(userId: string, code: string, expirationDate: number) {
        await pool.query(SAVE_PASSWORD_RESET_CODE_QUERY, [code, expirationDate, userId]);
    },
};
