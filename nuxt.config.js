
export default {
  mode: 'universal',

  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,500;0,600;0,700;1,400&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap' },
      { rel: 'stylesheet', href: 'http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      { rel: 'stylesheet', href: '/assets/libs/bootstrap4/bootstrap-tcl.css' }
    ],
    script: [
      {
        async: true,
        defer: true,
        crossorigin: "anonymous",
        src: "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v7.0&appId=682829465411569&autoLogAppEvents=1",
        nonce: "njMQVAzi"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/dayjs.js',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', '@nuxtjs/sitemap','@nuxtjs/robots','@nuxtjs/google-analytics','@nuxtjs/toast'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    baseURL: process.env.BASE_URL_API
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  sitemap: {
    exclude: [],
    defaults: {
      priority: 1,
      lastmod: new Date()
    },
    routes:  async () => {
        const axios = require('axios')
        let baseUrl = process.env.BASE_URL || process.env.BASE_URL_API
        const { data } = await axios.get(`${baseUrl}/sitemap`)
        return data.data.map(v => `/${v.canonical}`)
    }
  },
  robots: {
    UserAgent: '*',
    Disallow: '/'
  },
  
  googleAnalytics: {
    id: process.env.googleAnalytics
  },
  toast: {
    position: 'top-right',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  }
}
