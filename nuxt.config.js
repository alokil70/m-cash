import { URL } from './config/variables'

export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'm-cash',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=0.5',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    loading: false,

    router: {
        middleware: ['auth'],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['normalize.css', '~/assets/scss/style.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/vuelidate', mode: 'client' },
        { src: '~/plugins/vue-modal', mode: 'client' },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth',
    ],

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/auth/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: {
                        url: '/auth/user',
                        method: 'get',
                        propertyName: 'user',
                    },
                },
                // tokenRequired: true,
                // tokenType: 'bearer',
                // globalToken: true,
                // autoFetchUser: true
            },
        },
        redirect: {
            login: '/auth/login',
            home: '/',
        },
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: URL,
    },

    server: {
        port: 4040,
        host: '0.0.0.0',
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
}
