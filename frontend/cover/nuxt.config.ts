// https://nuxt.com/docs/api/configuration/nuxt-config
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

  //   hooks: {
  //     'components:dirs'(dirs) {
  //       console.log('Сканируемые директории:', dirs);
  //     },
  //     'components:extend'(components) {
  //       console.log('Найдено компонентов:', components.length);
  //     },
  //   },
});
