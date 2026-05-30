import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    [
      '@storyblok/nuxt',
      {
        accessToken: 'PrR7fZKev5wAsQoiiGLJFAtt',
        apiOptions: { region: 'eu' },
        useApiClient: true,
        enableSudoMode: false,
        bridge: import.meta.dev,
      },
    ],
  ],

  css: ['~/assets/style.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: 'Playfair Display', weights: [400, 600, 700] },
      { name: 'Jost', weights: [300, 400, 500, 600, 700] },
      { name: 'Cormorant', weights: [300, 400, 600] },
    ],
  },

  i18n: {
    locales: [
      { code: 'kz', language: 'kk-KZ', name: 'Қазақша', file: 'kz.ts' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.ts' },
    ],
    defaultLocale: 'kz',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: false,
    baseUrl: 'https://dobroe-serdce.kz',
  },

  runtimeConfig: {
    storyblokToken: 'PrR7fZKev5wAsQoiiGLJFAtt',
    public: {
      storyblokToken: 'PrR7fZKev5wAsQoiiGLJFAtt',
      storyblokVersion: 'published',
    },
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0063B5' },
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'geo.region', content: 'KZ-71' },
        { name: 'geo.placename', content: 'Астана' },
        { name: 'geo.position', content: '51.1801;71.4460' },
        { name: 'ICBM', content: '51.1801, 71.4460' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'alternate', hreflang: 'ru', href: 'https://dobroe-serdce.kz/ru' },
        { rel: 'alternate', hreflang: 'kk', href: 'https://dobroe-serdce.kz/' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://dobroe-serdce.kz/' },
      ],
    },
  },
})
