import React, { createContext, useState, useEffect, Children } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const author = axios.defaults.headers.common["Authorization"];
        if(author) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, []);

    return (
        <AuthContext.Provider value = {{ auth, setAuth}}>
            { auth === null ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export default AuthContext;