import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeWrapper from "./components/HomeWrapper";
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import MenuBar from './components/MenuBar';

export default function App() {

    return(
        <BrowserRouter>
            <div id='site-wrapper'>
                <MenuBar />
                <Routes>
                    <Route path='/' element={<HomeWrapper />}></Route>
                    <Route path='/login' element={<LoginScreen />}></Route>
                    <Route path='/register' element={<RegisterScreen />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}