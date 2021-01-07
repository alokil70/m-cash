export const state = () => ({
    srvUser: [],
})

export const mutations = {
    SET__TO_STATE(state, payload) {
        state.srvUser = payload
    },
}

export const actions = {
    GET__FROM_API({ commit }) {
        const token = this.$auth.getToken('local')
        if (token) {
            this.$axios({
                method: 'get',
                url: '/api/auth/serv-user',
                headers: {
                    Authorization: 'Bearer ' + token.split(' ')[2],
                },
            }).then((response) => {
                commit('SET__TO_STATE', response.data)
            })
        }
    },
}
