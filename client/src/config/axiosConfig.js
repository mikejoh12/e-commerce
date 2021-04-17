import axios from 'axios'

const apiAxios = axios.create({
    baseURL: '/api',
    withCredentials: true
})

export default apiAxios