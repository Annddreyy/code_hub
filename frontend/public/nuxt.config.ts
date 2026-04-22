export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt'],

    extends: ['../cover'],

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
        },
    },
});
