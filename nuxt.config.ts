// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Самарканд Вет Сервис | Вет Аптека | Samarqand Vet apteka | Vet Servis',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [ 
        {name:'title', content:'Вет Аптека Самарканд | Vet Apteka Samarqand'},
        { name:'description', content:'Добро пожаловать в нашу Ветеринарную Аптеку - SAMVETSERVIS Основанный в 2004 году, наш центр является надежным и опытным партнером в обеспечении заботы и поддержки вашего птицеводства. Мы специализируемся на предоставлении высококачественных продуктов и услуг, необходимых для поддержания здоровья, производительности и благополучия вашего стада. Наша Миссия Все начинается с любви к птицам и стремления обеспечить им лучшие условия жизни. Наша миссия — делать вашу работу в птицеводстве проще и более успешной, предоставляя широкий спектр необходимых продуктов. Что Мы Предлагаем? Антибиотики | Витамины | Комбикорма | Вакцины | Оборудование для Птицеводства  | Кормовые Добавки Почему Мы? Опыт и Доверие: Более 15 лет успешной работы в сфере птицеводства. Качество и Безопасность: Только сертифицированные продукты от надежных поставщиков. Профессионализм: Наши эксперты всегда готовы поделиться знаниями и предоставить профессиональные консультации.Мы гордимся тем, что с вами каждый шаг на пути к успешному птицеводству. Присоединяйтесь к тем, кто выбирает заботу и качество – выбирайте нашу ветеринарную аптеку-центр птицеводства для заботы о вашем стаде.' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "SAMVETSERVIS SVS Vet apteka",
            "url": "https://vet-apteka.uz/",
            "description": "Добро пожаловать в нашу Ветеринарную Аптеку - SAMVETSERVIS Основанный в 2004 году, наш центр является надежным и опытным партнером в обеспечении заботы и поддержки вашего птицеводства. Мы специализируемся на предоставлении высококачественных продуктов и услуг, необходимых для поддержания здоровья, производительности и благополучия вашего стада. Наша Миссия Все начинается с любви к птицам и стремления обеспечить им лучшие условия жизни. Наша миссия — делать вашу работу в птицеводстве проще и более успешной, предоставляя широкий спектр необходимых продуктов. Что Мы Предлагаем? Антибиотики | Витамины | Комбикорма | Вакцины | Оборудование для Птицеводства  | Кормовые Добавки Почему Мы? Опыт и Доверие: Более 15 лет успешной работы в сфере птицеводства. Качество и Безопасность: Только сертифицированные продукты от надежных поставщиков. Профессионализм: Наши эксперты всегда готовы поделиться знаниями и предоставить профессиональные консультации.Мы гордимся тем, что с вами каждый шаг на пути к успешному птицеводству. Присоединяйтесь к тем, кто выбирает заботу и качество – выбирайте нашу ветеринарную аптеку-центр птицеводства для заботы о вашем стаде.",
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
              "telephone": "+998933315678",
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