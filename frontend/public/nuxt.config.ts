// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt'],

    extends: ['../cover'],

    vite: {
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    },

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
        },
    },
});
