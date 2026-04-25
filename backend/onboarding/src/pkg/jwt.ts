import jwt from 'jsonwebtoken';
import { settings } from '@/internal/config';

export type JwtPayload = {
    userId: string;
    email: string;
    role: string;
};

export const jwtService = {
    verifyAccessToken(token: string) {
        try {
            return jwt.verify(token, settings.jwt.accessSecret!) as JwtPayload;
        } catch {
            return null;
        }
    },
};
