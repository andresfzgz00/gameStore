import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://169.254.119.35:3000'
})

export default instance