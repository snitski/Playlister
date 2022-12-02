import { useContext, useState } from "react";
import SplashScreen from "./SplashScreen";
import AuthContext from "../auth";

export default function HomeWrapper() {
    const auth = useContext(AuthContext);
    const splashScreenElement = <SplashScreen />;
    const [currentHomeScreen, setCurrentHomeScreen] = useState(splashScreenElement);

    if(!auth.loggedIn && currentHomeScreen !== splashScreenElement)
        setCurrentHomeScreen(splashScreenElement);

    return currentHomeScreen;
}