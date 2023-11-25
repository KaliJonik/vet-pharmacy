// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      title: 'SVS',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ href: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css', rel: 'stylesheet' }],
      meta: [],
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  devtools: { enabled: true },
  modules: [,
    'nuxt-swiper',
    'vue3-carousel-nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  i18n: {
    locales: [
      {
        code: 'ru',
        file: 'ru.json'
      },
      {
        code: 'uz',
        file: 'uz.json'
      },
    ],
    defaultLocale: 'ru',
    skipSettingLocaleOnNavigate: true,
    langDir: './locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL
    }
  },
  css: ['@/assets/style.css', '@mdi/font/css/materialdesignicons.min.css', ],
  build: {
    transpile: ['vuetify'],
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },

})