import { User, UserRole } from './user';

export type UserTableRow = {
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
    refreshToken: string | null;

    confirmationCode: string;
    confirmationExpiration: string;
    isConfirmed: boolean;

    longestStreak: number;
    totalXpEarned: number;
};

export const mapRow = (row: UserTableRow) => {
    const user = new User();

    user.id = row.id;

    user.name = row.name;
    user.email = row.email;
    user.role = row.role;
    user.avatarUrl = row.avatarUrl;
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

    user.longestStreak = row.longestStreak;
    user.totalXpEarned = row.totalXpEarned;

    return user;
};

export const CREATE_USER_QUERY = `
    INSERT INTO "user" (
        name, email, role, created_at, updated_at,
        password_hash, password_salt,
        confirmation_code, confirmation_expiration, is_confirmed,
        avatar_url, bio, location
    ) VALUES (
        $1, $2, $3, to_timestamp($4/1000.0), to_timestamp($5/1000.0),
        $6, $7, $8, $9, $10, $11, $12, $13
    )
    RETURNING id
`;

export const FIND_BY_EMAIL_QUERY = `
    SELECT * FROM "user" WHERE email = $1 LIMIT 1
`;

export const FIND_BY_ID_QUERY = `
    SELECT 
        u.*, 
        us.longest_streak,
        COALESCE(SUM(al.xp_earned), 0) AS total_xp_earned
    FROM "user" u
    LEFT JOIN "user_streak" us ON u.id = us.user_id
    LEFT JOIN "activity_log" al ON u.id = al.user_id
    WHERE u.id = $1
    GROUP BY u.id, us.longest_streak
    LIMIT 1
`;

export const UPDATE_USER_QUERY = `
    UPDATE "user" SET is_confirmed = true WHERE id = $1
`;

export const SAVE_REFRESH_TOKEN_QUERY = `
    UPDATE "user" SET refresh_token = $1 WHERE id = $2
`;

export const CLEAR_REFRESH_TOKEN_QUERY = `
    UPDATE "user" SET refresh_token = NULL WHERE id = $1
`;

export const UPDATE_PASSWORD_HASH_QUERY = `
    UPDATE "user" SET password_hash = $1, password_salt = $2 WHERE id = $3
`;

export const SAVE_PASSWORD_RESET_CODE_QUERY = `
    UPDATE "user" SET confirmation_code = $1, confirmation_expiration = $2 WHERE id = $3
`;
