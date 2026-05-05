// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        optimizeDeps: {
            include: ['@vue/devtools-core', '@vue/devtools-kit'],
        },
    },

    modules: ['@nuxt/eslint'],

    components: [{ path: './components' }],

    alias: {
        '@cover': join(currentDir, './app'),
    },

    //   hooks: {
    //     'components:dirs'(dirs) {
    //       console.log('Сканируемые директории:', dirs);
    //     },
    //     'components:extend'(components) {
    //       console.log('Найдено компонентов:', components.length);
    //     },
    //   },
});
