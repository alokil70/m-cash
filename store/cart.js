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
    CLEANCART(state) {
        state.cart = []
    }
}
export const actions = {
    ADD_TO_CART({ commit }, { product, quantity }) {
        commit('ADD_TO_CART', { product, quantity })
    },
    CLEANCART({ commit }) {
        commit('CLEANCART')
    }
}

export const getters = {
    CART: (s) => s.cart,
    TOTAL: (s) => {
        s.cart.forEach((item) => {
            const total = item.product.price * item.quantity
            s.totalCost = total
        })
    },
}
