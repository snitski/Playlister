import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import HomeWrapper from "./components/HomeWrapper";
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import MenuBar from './components/MenuBar';

export default function App() {

    return(
        <BrowserRouter>
            <AuthContextProvider>
                <div id='site-wrapper'>
                    <MenuBar />
                    <Routes>
                        <Route path='/' element={<HomeWrapper />}></Route>
                        <Route path='/login' element={<LoginScreen />}></Route>
                        <Route path='/register' element={<RegisterScreen />}></Route>
                        <Route path='/allplaylists'></Route>
                    </Routes>
                </div>
            </AuthContextProvider>
        </BrowserRouter>
    );
}