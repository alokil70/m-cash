module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        'no-undef': 'off',
        'vue/no-unused-vars': 'off',
        'vue/no-unused-components': 'off',
        'nuxt/no-this-in-fetch-data': 'off',
        'no-unused-vars': 'off',
        'no-debugger': 'off',
    },
}
