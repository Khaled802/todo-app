import { createContext , useContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isAuth = () => {
        return isAuthenticated;
    }

    const authenticate = (username, password) => {
        const loginState = username === "Khaled" && password === "react";
        setIsAuthenticated(loginState);
        return loginState;
    }

    const removeAuthentication = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuth, authenticate, removeAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuthContext = () => useContext(AuthContext)

export {
    AuthContext,
    AuthContextProvider,
    useAuthContext
}