import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { settings } from '@/internal/config';
import { authRouter } from '@/internal/api/auth/router';
import { errorMiddleware } from '@/internal/api/middleware/error.middleware';
import { swaggerDocument } from '@/docs/api/swagger';
import { logger } from '@/pkg/logger';

export const app = express();

app.use(cors({ origin: settings.cors.origin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, _res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorMiddleware);
