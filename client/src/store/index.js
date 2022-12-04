import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth';
import api from './axios-api';

export const GlobalStoreContext = createContext();

export const ViewTypes = {
    HOME: 0,
    ALL: 1,
    USER: 2
}

function GlobalStoreContextProvider(props) {
    const { auth } = useContext(AuthContext);
    const [store, setStore] = useState({
        currentView: ViewTypes.ALL,
        currentQuery: '',
        loadedPlaylists: []
    });

    // const storeReducer = (action) => {
    //     const { type, payload } = action;
    //     switch (type) {
    //         case "SET_VIEW": {
    //             return setStore({
    //                 currentView: payload,
    //                 currentQuery: '',
    //                 loadedPlaylists: store.loadedPlaylists
    //             })
    //         }
    //         case "SET_QUERY": {
    //             return setStore({
    //                 currentView: store.currentView,
    //                 currentQuery: payload,
    //                 loadedPlaylists: store.loadedPlaylists
    //             });
    //         }
    //         case "SET_LOADED_PLAYLISTS": {
    //             return setStore({
    //                 currentView: ViewTypes.ALL,
    //                 currentQuery: store.currentQuery,
    //                 loadedPlaylists: payload
    //             })
    //         }
    //     }
    // }

    store.goToHomeView = async () => {
        setStore({
            ...store,
            currentView: ViewTypes.HOME,
            currentQuery: '',
            loadedPlaylists: await store.getOwnedLists()
        })
        // await store.getOwnedLists();
        // store.getOwnedLists()
        // storeReducer({
        //     type: "SET_VIEW",
        //     payload: ViewTypes.HOME
        // });
    }

    store.goToAllView = async () => {
        setStore({
            ...store,
            currentView: ViewTypes.ALL,
            currentQuery: '',
            loadedPlaylists: []
        })
        // await store.clearLoadedLists();
        // storeReducer({
        //     type: "SET_VIEW",
        //     payload: ViewTypes.ALL
        // })
    }

    store.goToUserView = async () => {
        setStore({
            ...store,
            currentView: ViewTypes.USER,
            currentQuery: '',
            loadedPlaylists: []
        })
        // await store.clearLoadedLists();
        // storeReducer({
        //     type: "SET_VIEW",
        //     payload: ViewTypes.USER
        // });
    }

    store.setCurrentQuery = (newQuery) => {
        setStore({
            ...store,
            currentQuery: newQuery
        })
        // storeReducer({
        //     type: "SET_QUERY",
        //     payload: newQuery
        // })
    }

    store.createNewList = async () => {
        const response = await api.createList({
            name: 'Untitled',
            songs: [],
            ownerEmail: auth.user.email,
            ownerUsername: auth.user.username,
            published: false,
            likes: [],
            dislikes: []
        });
        if(response.status === 200) {
            setStore({
                ...store,
                loadedPlaylists: await store.getOwnedLists()
            })
        }
    }

    store.getOwnedLists = async () => {
        const response = await api.getPlaylists({ownerEmail: auth.user.email})
        if(response.status === 200) {
            return response.data.playlists
        }
    }

    store.searchLists = async (query) => {
        if(query === '') {
            query = { };
        }
        let response = null;
        switch(store.currentView) {
            case ViewTypes.HOME: {
                response = await api.getPlaylists({ownerEmail: auth.user.email, name: query})
                break;
            }
            case ViewTypes.ALL: {
                response = await api.getPlaylists({published: true, name: query})
                break;
            }
            case ViewTypes.USER: {
                response = await api.getPlaylists({published: true, ownerEmail: query})
                break;
            }
        }

        if(response.status === 200) {
            setStore({
                ...store,
                currentQuery: query,
                loadedPlaylists: response.data.playlists
            });
            return response.data.playlists;
        }
    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };