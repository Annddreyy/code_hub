import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PUBLIC_PATHS } from '@/config/services';

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

const isPublic = (req: Request): boolean => {
    const key = `${req.method} ${req.path}`;
    return PUBLIC_PATHS.some((p) => key.startsWith(p));
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (isPublic(req)) return next();

    const token = req.cookies?.accessToken;

    if (!token) {
        res.status(401).json({ message: 'Не авторизован' });
        return;
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET! || 'test_access_secret_key_1234567890',
        ) as JwtPayload;

        req.headers['x-user-id'] = payload.userId;
        req.headers['x-user-email'] = payload.email;
        req.headers['x-user-role'] = payload.role;

        delete req.headers['cookie'];
        delete req.headers['authorization'];

        next();
    } catch {
        res.status(401).json({ message: 'Невалидный или просроченный токен' });
    }
};
