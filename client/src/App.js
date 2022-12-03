import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import TitleBar from './components/TitleBar';
import SplashScreen from './components/SplashScreen';
import ViewWrapper from './components/ViewWrapper';

export default function App() {
    return(
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>
                    <div id='site-wrapper'>
                        <TitleBar />
                        <Routes>
                            <Route path='/' element={<SplashScreen />}></Route>
                            <Route path='/login' element={<LoginScreen />}></Route>
                            <Route path='/register' element={<RegisterScreen />}></Route>
                            <Route path='/home' element={<ViewWrapper />}></Route>
                        </Routes>
                    </div>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    );
}