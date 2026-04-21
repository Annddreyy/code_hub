export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt'],

    extends: ['../cover'],

    app: {
        head: {
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap',
                },
            ],
        },
    },
});
