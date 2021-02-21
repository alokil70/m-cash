export const state = () => ({
    orderList: [],
    totalCost: null,
})

export const mutations = {
    SET_ORDER_TO_STATE(state, payload) {
        state.orderList = payload
    },
}
export const actions = {
    async GET_ORDER_LIST_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/order',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_ORDER_TO_STATE', response.data)
            })
        }
    },
    async NEW_ORDER({ dispatch }, postData) {
        await this.$axios.post('/order', postData)
        await dispatch('GET_ORDER_LIST_FROM_API')
    },
    async CLOSE_SHIFT({ commit }, postData) {
        const data = {
            manager: this.$auth.user.email,
            total: 1200,
        }
        await this.$axios.patch('/cashShift/' + postData, data)
    },
    async DELETE_SHIFT({ commit }, postData) {
        await this.$axios.post('/cashShift/delete/' + postData)
    },
}

export const getters = {
    ORDER_LIST: (s) => s.orderList,
    GET_ORDER: (s) => (id) => {
        return s.orderList.find((u) => u.id === id).positions
    },
    ORDER_LIST_FILTERED: (s) => s.orderList.filter((item) => item.user === 3),
}
