import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/auth',
})

export const getLoggedIn = () => api.get(`/loggedIn/`);

export const loginUser = (body) => {
    return api.post(`/login/`, body).catch((error) => { return error })
}

export const logoutUser = () => api.get(`/logout/`)

export const registerUser = (body) => {
    return api.post(`/register/`, body).catch((error) => { return error })
}

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis