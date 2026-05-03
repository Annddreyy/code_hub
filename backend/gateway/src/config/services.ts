export interface ServiceConfig {
    target: string;
    prefix: string;
    requireAuth: boolean;
}

export const SERVICES: ServiceConfig[] = [
    {
        prefix: '/api/auth',
        target: process.env.AUTH_SERVICE_URL ?? 'http://localhost:8001',
        requireAuth: false,
    },
    {
        prefix: '/api/onboarding',
        target: process.env.ONBOARDING_SERVICE_URL ?? 'http://localhost:8002',
        requireAuth: true,
    },
    {
        prefix: '/api/profile',
        target: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:8003',
        requireAuth: true,
    },
    {
        prefix: '/api/roadmaps',
        target: process.env.ROADMAPS_SERVICE_URL ?? 'http://localhost:8004',
        requireAuth: true,
    },
    {
        prefix: '/api',
        target: process.env.MAIN_SERVICE_URL ?? 'http://localhost:8000',
        requireAuth: true,
    },
];

export const PUBLIC_PATHS = [
    'POST /api/auth/register',
    'POST /api/auth/login',
    'POST /api/auth/refresh',
    'POST /api/auth/request-password-reset',
    'POST /api/auth/reset-password',
    'GET /api/auth/confirm-email',
    'GET /api/auth/me',
];
