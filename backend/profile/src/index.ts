import 'reflect-metadata';
import { app } from '@/internal/api/app';
import { connectDB } from '@/internal/infrastructure/db';
import { settings } from '@/internal/config';
import { logger } from '@/pkg/logger';

const bootstrap = async () => {
    await connectDB();
    app.listen(settings.port, () => {
        logger.info(`Auth service started on port ${settings.port}`);
    });
};

bootstrap().catch((err) => {
    logger.error('Failed to start application:', err);
    process.exit(1);
});
