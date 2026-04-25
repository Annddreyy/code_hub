import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { settings } from '@/internal/config';
import { onboardingRouter } from '@/internal/api/onboarding/router';
import { errorMiddleware } from '@/internal/api/middleware/error.middleware';
import { onboardingSwaggerDocument } from '@/docs/api/swagger';
import { logger } from '@/pkg/logger';

export const app = express();

console.log(settings.cors.origin)

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use((req, _res, next) => {
    logger.debug(`${req.method} ${req.path}`);
    next();
});

app.use('/', onboardingRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(onboardingSwaggerDocument));

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorMiddleware);
