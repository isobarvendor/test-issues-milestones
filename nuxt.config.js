
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    "./plugins/vue-awesome-swiper.js"
  ],
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
    '@nuxtjs/auth',
    '@nuxtjs/toast',
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
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/login', method: 'post', propertyName: 'token'},
          logout: false,
          user: {url: '/user', method: 'get', propertyName: 'data'},
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      },
      facebook: {
        client_id: '368399970838571',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email',
        scope: ['public_profile', 'email']
      },
      google: {
        client_id: '1055325725831-bpa8sn1i3o2l98tes241pjjtecuk5vqc.apps.googleusercontent.com',
        scope: ['openid', 'profile', 'email']
      },
    },
    redirect: {
      login: '/login',
      logout: '/logout',
      user: '/profile',
      callback:'/'
    }
  },
  router: {
    // middleware: ['auth']
  },
  axios: {
    // baseURL: 'https://localhost:3000'
  },
  toast: {
    position: 'top-right',
    duration: 2000
  },
  loading: {
    name: 'chasing-dots',
    color: '#ff5638',
    background: 'white',
    height: '4px'
 },
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
