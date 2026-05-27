import { Pool } from 'pg';
import { settings } from '@/internal/config';
import { logger } from '@/pkg/logger';

export const pool = new Pool({
    host: settings.db.host,
    port: settings.db.port,
    user: settings.db.user,
    password: settings.db.password,
    database: settings.db.database,
    max: 20,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
});

pool.on('error', (err) => {
    logger.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(1);
});

export const connectDB = async (): Promise<void> => {
    const client = await pool.connect();
    try {
        await client.query('SELECT 1');
    } finally {
        client.release();
    }
    logger.info(
        `Connected to PostgreSQL at ${settings.db.host}:${settings.db.port}/${settings.db.database}`,
    );
};
