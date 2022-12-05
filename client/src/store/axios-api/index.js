import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createList = (playlistData) => {
    return api.post(`/playlist/`, playlistData);
}

export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)


export const getPlaylists = (query) => {
    return api.get(`/playlists/`, { params: query });
}

export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        playlist : playlist
    })
}

const apis = {
    createList,
    deletePlaylistById,
    getPlaylists,
    updatePlaylistById
}

export default apis