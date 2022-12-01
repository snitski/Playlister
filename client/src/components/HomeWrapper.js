import { useState } from "react";
import SplashScreen from "./SplashScreen";

export default function HomeWrapper() {
    let [currentHomeScreen, setCurrentHomeScreen] = useState(<SplashScreen />);
    return currentHomeScreen;
}