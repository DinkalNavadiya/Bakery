import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
const initialState = {
    user: null
}
if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(
        localStorage.getItem("token"),
    );
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    }
    else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: JSON.parse(localStorage.getItem("user")),
    login: (userData) => { },
    logout: () => { },
    register: (DataUser) => { },
    addUser: (usersData) => { },
});

function authReducer(state, action) {
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                user: action.payload
            }
        case "LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const register = (userData) => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("UserData", JSON.stringify(userData));
        localStorage.setItem("createdBy", userData.id);
        dispatch({
            type: "REGISTER",
            payload: userData
        })
    }

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("UserData", JSON.stringify(userData));
        localStorage.setItem("createdBy", userData.id);
        dispatch({
            type: "LOGIN",
            payload: userData
        })
    }
    const Id = localStorage.getItem("createdBy")

    const addUser = (usersData) => {
        localStorage.setItem("addUserByAdmin", JSON.stringify(usersData))
        localStorage.setItem("createdBy", Id);
        dispatch({
            type: "REGISTER",
            payload: usersData
        })
    }
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("UserData");
        localStorage.removeItem("createdBy");
        localStorage.removeItem("addUserByAdmin");
        dispatch({ type: "LOGOUT" });
    }
    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout, register, addUser }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider };