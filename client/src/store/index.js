import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../auth';

export const GlobalStoreContext = createContext();

export const ViewTypes = {
    HOME: 0,
    ALL: 1,
    USER: 2
}

export const StoreActionType = {
    UPDATE_VIEW: "UPDATE_VIEW",
    UPDATE_QUERY: "UPDATE_QUERY"
}

function GlobalStoreContextProvider(props) {
    const { auth } = useContext(AuthContext);
    const [store, setStore] = useState({
        currentView: ViewTypes.ALL,
        currentQuery: ''
    });

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case StoreActionType.UPDATE_VIEW: {
                return setStore({
                    currentView: payload,
                    currentQuery: ''
                })
            }
            case StoreActionType.UPDATE_QUERY: {
                return setStore({
                    currentView: store.currentView,
                    currentQuery: payload
                });
            }
        }
    }

    store.setCurrentView = (newView) => {
        storeReducer({
            type: StoreActionType.UPDATE_VIEW,
            payload: newView
        })
    }

    store.setCurrentQuery = (newQuery) => {
        storeReducer({
            type: StoreActionType.UPDATE_QUERY,
            payload: newQuery
        })
    }

    store.createNewList = () => {

    }

    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };