import { Request, Response, NextFunction } from 'express';
import { jwtService } from '@/pkg/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const payload = jwtService.verifyAccessToken(token);

    if (!payload) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }

    req.user = payload;
    next();
};
