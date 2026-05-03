import { Request, Response, NextFunction } from 'express';
import { jwtService } from '@/pkg/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = req.cookies?.accessToken;
    }

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }

    try {
        const payload = jwtService.verifyAccessToken(token);

        if (!payload) {
            res.status(401).json({ message: 'Invalid or expired token' });
            return;
        }

        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
};
