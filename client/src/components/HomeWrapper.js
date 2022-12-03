import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../auth";
import GlobalStoreContext from "../store";
import SplashScreen from "./SplashScreen";
import PlaylistView from "./PlaylistView"

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    
    if(!auth.loggedIn && store.currentHomeScreen !== 0) {
        store.updateCurrentHomeScreen(0);
    }

    if(auth.loggedIn && store.currentHomeScreen !== 1) {
        store.updateCurrentHomeScreen(1);
    }

    let currentHomeScreenElement = <SplashScreen />;

    if(store.currentHomeScreen === 1) {
        currentHomeScreenElement = <PlaylistView />
        return <PlaylistView />;
    }

    return <SplashScreen />;
}