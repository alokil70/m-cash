export const state = () => ({
    cart: [],
    totalCost: null,
})

export const mutations = {
    ADD_TO_CART(state, { product, quantity }) {
        const productCart = state.cart.find((i) => i.product.id === product.id)
        if (productCart) {
            productCart.quantity++
            return
        }
        state.cart.push({ product, quantity })
    },
    CLEAN_CART(state) {
        state.cart = []
    },
}
export const actions = {
    ADD_TO_CART({ commit }, { product, quantity }) {
        commit('ADD_TO_CART', { product, quantity })
    },
    CLEAN_CART({ commit }) {
        commit('CLEAN_CART')
    },
}

export const getters = {
    CART: (s) => s.cart,
    TOTAL: (s) => {
        s.cart.forEach((item) => {
            s.totalCost = item.product.price * item.quantity
        })
    },
}
