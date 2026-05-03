import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVICES } from '@/config/services';

export const registerProxies = (app: Express) => {
    for (const service of SERVICES) {
        const middlewares = [];

        middlewares.push(
            createProxyMiddleware({
                target: service.target,
                changeOrigin: true,
                on: {
                    error: (_err, _req, res: any) => {
                        res.status(502).json({
                            message: `Service unavailable: ${service.prefix}`,
                        });
                    },
                },
            }),
        );

        app.use(service.prefix, ...middlewares);
    }
};
