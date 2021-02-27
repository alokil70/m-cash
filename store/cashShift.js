export const state = () => ({
    cashShifts: [],
    totalCost: null,
})

export const mutations = {
    SET_CASH_SHIFTS_TO_STATE(state, payload) {
        state.cashShifts = payload
    },
}
export const actions = {
    async GET_CASH_SHIFTS_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            await this.$axios({
                method: 'get',
                url: '/cashShift',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_CASH_SHIFTS_TO_STATE', response.data)
            })
        }
    },
    async OPEN_NEW_SHIFT({ commit }, postData) {
        await this.$axios.post('/cashShift', postData)
        await this.dispatch('cashShift/GET_CASH_SHIFTS_FROM_API')
    },
    async CLOSE_SHIFT({ commit }, postData) {
        const data = {
            manager: this.$auth.user.email,
            total: 1200,
        }
        await this.$axios.patch('/cashShift/' + postData, data)
        await this.dispatch('cashShift/GET_CASH_SHIFTS_FROM_API')
    },
    async DELETE_SHIFT({ commit }, postData) {
        await this.$axios.post('/cashShift/delete/' + postData)
    },
}

export const getters = {
    CASH_SHIFTS: (s) => s.cashShifts,
    LAST_CASH_SHIFT: (s) => s.cashShifts[s.cashShifts.length - 1],
}
