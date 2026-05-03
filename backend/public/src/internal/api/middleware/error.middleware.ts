import { Request, Response, NextFunction } from 'express';
import { logger } from '@/pkg/logger';

export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ message: 'Internal Server Error' });
};
