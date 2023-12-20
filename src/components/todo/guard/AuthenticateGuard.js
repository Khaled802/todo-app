import { Navigate } from "react-router-dom";
import { useAuthContext } from "../security/AuthContext";


export default function AuthenticateGuard({ children }) {
    const { isAuth } = useAuthContext();
    console.log(children);
    if (isAuth()) return children
    return <Navigate to="/login" />
}