import { useEffect, useState, createContext, useContext } from "react";

import {
    saveUser,
    getUser,
    removeUser
} from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(getUser());

    const login = (userData) => {

        saveUser(userData);

    setUser(userData);

    };

    const logout = () => {
        removeUser();

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}