import { createContext , useContext, useState } from "react";
import { apiClient } from "../api/apiClient";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const isAuth = () => {
        return isAuthenticated;
    }

    const authenticate = async (usernameEnterd, passwordEnterd) => {
        removeAuthentication()
        const response = await apiClient.post("/authenticate", { username: usernameEnterd, password: passwordEnterd});
        console.log(response)
        
        if (response.status === 200) {
            setIsAuthenticated(true);
            setUsername(usernameEnterd)
            setPassword(passwordEnterd)
            const token = (await response.data).token;
            localStorage.setItem("token", `Bearer ${token}`)
            // token = await response.data.token;
            return true;
        } else {
            removeAuthentication()
            return false;
        }

    }

    const removeAuthentication = () => {
        setIsAuthenticated(false);
        setUsername(null)
        setPassword(null)
        localStorage.removeItem("token")
    }

    const getUsername = () => {
        return username;
    }

    const getPassword = () => {
        return password;
    }

    return (
        <AuthContext.Provider value={{ isAuth, authenticate, removeAuthentication, getUsername, getPassword }}>
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