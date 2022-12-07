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
        type: 'overwrite',
        playlist : playlist
    })
}

export const renamePlaylistById = (id, newName) => {
    return api.put(`/playlist/${id}`, {
        type: 'rename',
        newName: newName
    })
}

export const likePlaylistById = (playlistId, username) => {
    return api.put(`playlist/${playlistId}`, {
        type: 'like',
        username: username
    })
}

export const dislikePlaylistById = (playlistId, username) => {
    return api.put(`playlist/${playlistId}`, {
        type: 'dislike',
        username: username
    })
}

export const commentOnPlaylistById = (playlistId, comment) => {
    return api.put(`playlist/${playlistId}`, {
        type: 'comment',
        comment: comment
    })
}

export const listenToPlaylistById = (id) => {
    return api.put(`playlist/${id}`, {
        type: 'listen'
    })
}

const apis = {
    createList,
    deletePlaylistById,
    getPlaylists,
    updatePlaylistById,
    renamePlaylistById,
    likePlaylistById,
    dislikePlaylistById,
    commentOnPlaylistById,
    listenToPlaylistById
}

export default apis