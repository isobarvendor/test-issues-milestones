
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** ENVs
  */
  publicRuntimeConfig: {
    //baseURL: 'https://nuxtjs.org'
  },
  privateRuntimeConfig: {
    //apiSecret: process.env.API_SECRET
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'img/icons/favicon.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/fonts.scss',
    'swiper/css/swiper.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    "./plugins/vue-awesome-swiper.js",
    './plugins/axios', //axios interceptor
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
  router: {
    middleware: ['redirect']
},
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
 buildModules: [
    // Simple usage
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-validate',
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'sm',
        breakpoints: {
          sm: 576,
          md: 768,
          lg: 992,
          xl: Infinity
        }
      }
    ]
  ],
  styleResources: {
    scss: [
      '~assets/scss/variables.scss',
      '~assets/scss/mixins.scss',
    ]
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
