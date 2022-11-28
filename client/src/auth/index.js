import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGON_ERROR: "LOGON_ERROR",
    REGISTER_ERROR: "REGISTER_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        logonError: null,
        registerError: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    logonError: null,
                    registerError: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    logonError: null,
                    registerError: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    logonError: null,
                    registerError: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    logonError: null,
                    registerError: null
                })
            }
            case AuthActionType.LOGON_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    logonError: payload.error,
                    registerError: null
                })
            }
            case AuthActionType.REGISTER_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    logonError: null,
                    registerError: payload.error
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            await auth.loginUser(email, password)
        }
        else {
            authReducer({
                type: AuthActionType.REGISTER_ERROR,
                payload: {
                    error: response.response.data.errorMessage
                }
            })
        }
    }

    auth.loginUser = async function(email, password) {
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
        else {
            authReducer({
                type: AuthActionType.LOGON_ERROR,
                payload: {
                    error: response.response.data.errorMessage
                }
            })
        }
    }

    auth.clearErrors = function() {
        authReducer({
            type: AuthActionType.LOGON_ERROR,
            payload: {
                error: null
            }
        })
        authReducer({
            type: AuthActionType.REGISTER_ERROR,
            payload: {
                error: null
            }
        })
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };