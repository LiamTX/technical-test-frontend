import axios from 'axios'

axios.interceptors.request.use(
    (config) => {
        config.headers.Authentication = localStorage.token
        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default axios