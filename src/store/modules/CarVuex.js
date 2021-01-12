import axios from '../../utils/axios';

export default {

    namespaced: true,

    state: {
        userApiLoading: false
    },

    getters: {
        userApiLoading: state => state.userApiLoading
    },

    mutations: {
        setUserApiLoading(state, newState) {
            state.userApiLoading = newState
        }
    },

    actions: {

        async auth(context, data) {
            const response = await axios.get(process.env.VUE_APP_BASE_URL + '/users/create', data);

            return response;
        }

    }
}
