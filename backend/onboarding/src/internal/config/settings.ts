import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export const settings = {
    port: process.env.PORT,

    db: {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },

    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
    },

    cors: {
        origin: process.env.CORS_ORIGIN,
    },
};
