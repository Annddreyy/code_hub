import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { errorMiddleware } from '@/internal/api/middleware/error.middleware';
import { onboardingSwaggerDocument } from '@/docs/api/swagger';
import { logger } from '@/pkg/logger';
import { achievementsRouter } from './achievement/router';
import { settingsRouter } from './settings/router';

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use((req, _res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
});

app.use('/achievements', achievementsRouter);
app.use('/settings', settingsRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(onboardingSwaggerDocument));

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorMiddleware);
