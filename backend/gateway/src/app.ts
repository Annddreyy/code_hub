import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authMiddleware } from '@/middleware/auth.middleware';
import { registerProxies } from '@/proxy';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }),
);

app.use(authMiddleware);

registerProxies(app);

app.use((_req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Gateway running on :${PORT}`));
