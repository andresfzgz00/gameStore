import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://localhost:44355/api/videogames/'
})

export default instance