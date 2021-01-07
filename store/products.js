export const state = () => ({
    products: [],
    category: [],
})

export const mutations = {
    SET_PRODUCTS_TO_STATE(state, payload) {
        state.products = payload
    },
    SET_CATEGORY_TO_STATE(state, payload) {
        state.category = payload
    },
}
export const actions = {
    GET_PRODUCTS_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            this.$axios({
                method: 'get',
                url: '/products',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_PRODUCTS_TO_STATE', response.data)
            })
        }
    },
    GET_CATEGORY_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            this.$axios({
                method: 'get',
                url: '/category',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_CATEGORY_TO_STATE', response.data)
            })
        }
    },
    async POST_CATEGORY_TO_API({ commit }, postData) {
        await this.$axios.post('/category', postData)
    },
    async POST_PRODUCT_TO_API({ commit }, postData) {
        await this.$axios.post('/products', postData)
    },
    async DELETE_PRODUCT_FROM_API({ commit }, productId) {
        await this.$axios.post('/products/delete/' + productId)
    },
    async DELETE_CATEGORY_FROM_API({ commit }, productId) {
        await this.$axios.post('/category/delete/' + productId)
    },
}

export const getters = {
    PRODUCTS: (s) => s.products,
    CATEGORY: (s) => s.category,
}
