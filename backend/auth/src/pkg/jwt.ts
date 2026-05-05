import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { settings } from '@/internal/config';

export type JwtPayload = {
    userId: string;
    email: string;
    role: string;
};

export const jwtService = {
    signAccessToken(payload: JwtPayload) {
        return jwt.sign(payload, settings.jwt.accessSecret!, {
            expiresIn: settings.jwt.accessExpiresIn as StringValue,
        });
    },

    signRefreshToken(payload: JwtPayload) {
        return jwt.sign(payload, settings.jwt.refreshSecret!, {
            expiresIn: settings.jwt.refreshExpiresIn as StringValue,
        });
    },

    verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, settings.jwt.accessSecret!) as JwtPayload;
        } catch {
            return null;
        }
    },

    verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, settings.jwt.refreshSecret!) as JwtPayload;
        } catch {
            return null;
        }
    },
};
