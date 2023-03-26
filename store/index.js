export const state = () => ({
    srvUser: [],
})

export const mutations = {
    SET_TO_STATE(state, payload) {
        state.srvUser = payload
    },
}

export const actions = {
    GET_FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            this.$axios({
                method: 'get',
                url: '/api/auth/user',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET_TO_STATE', response.data)
            })
        }
    },
}

export const getters = {
    getServerUser: (state) => {
        return state.srvUser
    },
}
