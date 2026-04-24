
import { pool } from '@/internal/infrastructure/db';import { User, UserRole, EmailConfirmation, JwtData } from './user';
import camelcaseKeys from 'camelcase-keys';

type DbRow = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl: string;
    bio: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    passwordHash: string;
    passwordSalt: string;
    confirmationCode: string;
    confirmationExpiration: string;
    isConfirmed: boolean;
    refreshToken: string | null;
};

const mapRow = (row: DbRow) => {
    const user = new User();

    user.id = row.id;
    user.name = row.name;
    user.avatarUrl = row.avatarUrl;
    user.email = row.email;
    user.role = row.role;
    user.bio = row.bio;
    user.location = row.location;
    user.createdAt = Number(row.createdAt);
    user.updatedAt = Number(row.updatedAt);
    user.jwtData = {
        passwordHash: row.passwordHash,
        passwordSalt: row.passwordSalt,
    };
    user.emailConfirmation = {
        confirmationCode: row.confirmationCode,
        expirationDate: Number(row.confirmationExpiration),
        isConfirmed: row.isConfirmed,
    };
    user.refreshToken = row.refreshToken ?? undefined;

    return user;
};

export const userRepository = {
    async createUser(data: {
        name: string;
        email: string;
        role: UserRole;
        createdAt: number;
        jwtData: JwtData;
        emailConfirmation: EmailConfirmation;
        avatarUrl?: string;
        bio?: string;
        location?: string;
        updatedAt?: number;
    }) {
        console.log(data)
        const result = await pool.query(
        `INSERT INTO "user" (
            name, email, role, created_at, updated_at,
            password_hash, password_salt,
            confirmation_code, confirmation_expiration, is_confirmed,
            avatar_url, bio, location
        ) VALUES ($1,$2,$3, to_timestamp($4/1000.0), to_timestamp($5/1000.0), $6,$7,$8,$9,$10,$11,$12,$13)
        RETURNING id`,
            [
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
            ],
        );

        return result.rows[0].id;
    },

    async findByEmail(email: string) {
        const { rows } = camelcaseKeys(
            await pool.query<DbRow>('SELECT * FROM "user" WHERE email = $1 LIMIT 1', [email]),
            { deep: true },
        );
        return rows[0] ? mapRow(rows[0]) : null;
    },

    async findById(id: string) {
        const { rows } = camelcaseKeys(
            await pool.query<DbRow>('SELECT * FROM "user" WHERE id = $1 LIMIT 1', [id]),
            { deep: true },
        );
        return rows[0] ? mapRow(rows[0]) : null;
    },

    async updateConfirmation(id: string) {
        const { rowCount } = await pool.query('UPDATE "user" SET is_confirmed = true WHERE id = $1', [
            id,
        ]);
        return (rowCount ?? 0) > 0;
    },

    async saveRefreshToken(userId: string, token: string) {
        await pool.query('UPDATE "user" SET refresh_token = $1 WHERE id = $2', [token, userId]);
    },

    async clearRefreshToken(userId: string) {
        await pool.query('UPDATE "user" SET refresh_token = NULL WHERE id = $1', [userId]);
    },

    async updatePasswordHash(userId: string, passwordHash: string, passwordSalt: string) {
        const { rowCount } = await pool.query(
            'UPDATE "user" SET password_hash = $1, password_salt = $2 WHERE id = $3',
            [passwordHash, passwordSalt, userId],
        );
        return (rowCount ?? 0) > 0;
    },

    async savePasswordResetCode(userId: string, code: string, expirationDate: number) {
        await pool.query(
            `UPDATE "user"
             SET confirmation_code = $1, confirmation_expiration = $2
             WHERE id = $3`,
            [code, expirationDate, userId],
        );
    },
};
