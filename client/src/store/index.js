import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const GlobalStoreContext = createContext();

export const PlaylistViews = {
    HOME: 0,
    ALL: 1,
    USER: 2
}

export const StoreActionType = {
    UPDATE_PLAYLIST_VIEW: "UPDATE_PLAYLIST_VIEW",
    UPDATE_QUERY: "UPDATE_QUERY"
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        currentPlaylistView: PlaylistViews.ALL,
        currentQuery: ''
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case StoreActionType.UPDATE_PLAYLIST_VIEW: {
                return setStore({
                    currentPlaylistView: payload,
                    currentQuery: ''
                })
            }
            case StoreActionType.UPDATE_QUERY: {
                return setStore({
                    currentPlaylistView: store.currentPlaylistView,
                    currentQuery: payload
                });
            }
        }
    }

    store.setCurrentPlaylistView = (newView) => {
        storeReducer({
            type: StoreActionType.UPDATE_PLAYLIST_VIEW,
            payload: newView
        })
    }

    store.setCurrentQuery = (newQuery) => {
        storeReducer({
            type: StoreActionType.UPDATE_QUERY,
            payload: newQuery
        })
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };