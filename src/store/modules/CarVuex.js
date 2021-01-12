import axios from '../../utils/axios';

export default {

    namespaced: true,

    state: {
        carApiLoading: false
    },

    getters: {
        carApiLoading: state => state.carApiLoading
    },

    mutations: {
        setCarApiLoading(state, newState) {
            state.carApiLoading = newState
        }
    },

    actions: {

        async register(context, data) {
            const response = await axios.post(process.env.VUE_APP_BASE_URL + '/cars/create', data);

            return response;
        }

    }
}
