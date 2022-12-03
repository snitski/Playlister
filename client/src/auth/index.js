import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import api from './axios-api';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });

    auth.registerUser = async (formData) => {
        const response = await api.registerUser(formData)
        if(response.status === 200) {
            navigate('/login');
            return response;
        }
        return response.response;
    }

    auth.loginUser = async ({email, password}) => {
        const response = await api.loginUser({ email, password });
        if(response.status === 200) {
            setAuth({
                user: response.data.user,
                loggedIn: true
            });
            navigate('/home');
            return response;
        }
        return response.response;
    }

    auth.logoutUser = async () => {
        const response = await api.logoutUser();
        if(response.status === 200) {
            setAuth({
                user: null,
                loggedIn: false
            })
            navigate('/');
        }
    }

    return (
        <AuthContext.Provider value={{auth}}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContext
export { AuthContextProvider };