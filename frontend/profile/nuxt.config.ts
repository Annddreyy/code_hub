// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        optimizeDeps: {
            include: ['@vue/devtools-core', '@vue/devtools-kit'],
        },
    },

    runtimeConfig: {
        public: {
            basePath: import.meta.env.NUXT_PUBLIC_BASE_PATH
        }
    },

    modules: ['@nuxt/eslint', '@pinia/nuxt'],

    extends: ['../cover'],

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
        },
    },
});
