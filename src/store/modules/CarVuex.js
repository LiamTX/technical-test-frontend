import axios from '../../utils/axios';

export default {

    namespaced: true,

    state: {
        carApiLoading: false,
        cars: []
    },

    getters: {
        carApiLoading: state => state.carApiLoading,
        cars: state => state.cars
    },

    mutations: {
        setCarApiLoading(state, newState) {
            state.carApiLoading = newState
        },
        setCars(state, newState) {
            state.cars = newState
        }
    },

    actions: {

        async getCars(context) {
            const cars = await axios.get(process.env.VUE_APP_BASE_URL + '/cars/all');


            await context.commit('setCars', cars.data)
        },

        async register(context, data) {
            const response = await axios.post(process.env.VUE_APP_BASE_URL + '/cars/create', data);

            return response;
        },

        async delete(context, data) {
            const response = await axios.delete(process.env.VUE_APP_BASE_URL + `/cars/${data}/delete`)

            return response;
        },

        async edit(context, data) {
            const response = await axios.put(process.env.VUE_APP_BASE_URL + '/cars/edit', data);

            return response;
        }

    }
}
