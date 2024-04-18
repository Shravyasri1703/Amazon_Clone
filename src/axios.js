import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://127.0.0.1:5001/ama-clone-99e82/us-central1/api'
})

export default instance