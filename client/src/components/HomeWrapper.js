import { useContext, useState } from "react";
import AuthContext from "../auth";
import SplashScreen from "./SplashScreen";
import PersonalLists from "./PersonalLists"

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const [currentHomeScreen, setCurrentHomeScreen] = useState(0);
    
    if(!auth.loggedIn && currentHomeScreen !== 0) {
        setCurrentHomeScreen(0);
    }

    if(auth.loggedIn && currentHomeScreen !== 1) {
        setCurrentHomeScreen(1);
    }

    let currentHomeScreenElement = <SplashScreen />;

    if(currentHomeScreen === 1) {
        currentHomeScreenElement = <PersonalLists />
    }

    return currentHomeScreenElement;
}