// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
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
                path: '/profile/__vite_hmr',
            },
        },
    },

    modules: ['@nuxt/eslint', '@pinia/nuxt'],

    extends: ['../cover'],

    app: {
        baseURL: '/profile/',
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
        },
    },
});
