// frontend/auth/nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    app: {
        baseURL: '/auth/',
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
        },
    },

    vite: {
        optimizeDeps: {
            include: ['@vue/devtools-core', '@vue/devtools-kit'],
        },
        server: {
            allowedHosts: ['codehub.localhost.com'],
            hmr: {
                protocol: 'ws',
                host: 'localhost',
                port: 80,
                path: '/auth/__vite_hmr',
            },
        },
    },

    modules: ['@nuxt/eslint'],
});
