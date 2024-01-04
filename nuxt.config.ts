// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Samvetservis| Вет Аптека | Vet Apteka | Птицеводство | Tovuqchilik | Вет Препараты | Dorilar',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [ 
        {name:'title', content:'Вет Аптека Самарканд | Vet Apteka Samarqand'},
        { name:'description', content:'Ветеринарная аптека SAMVETSERVIS. Наш Центр Птицеводства предлагает  качественные ветеренарные препараты, бройлерные цыплята, комбикорма, для ваших птиц по выгодным ценам.' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "SAMVETSERVIS SVS Vet apteka",
            "url": "https://vet-apteka.uz/",
            "description": "Ветеринарная аптека SAMVETSERVIS. Наш Центр Птицеводства предлагает  качественные ветеренарные препараты, бройлерные цыплята, комбикорма, для ваших птиц по выгодным ценам.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Самарканд",
              "addressLocality": "Самарканд",
              "addressRegion": "Самарканд",
              "postalCode": "140100",
              "addressCountry": "Узбекистан"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+998973177773",
              "contactType": "customer service"
            }
          })
        }
      ],
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  devtools: { enabled: false },

  modules: [,

    'nuxt-swiper',
    'vue3-carousel-nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
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
  css: ['@/assets/style.css' ],
  build: {
    transpile: ['vuetify'],
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },

})