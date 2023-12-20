import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./TodoApp.css";
import ListTodosComponent from "./component/ListTodosComponent";
import LoginComponent from "./component/LoginComponent";
import LogoutComponent from "./component/LogoutComponent";
import NavBarComponent from "./component/NavBarComponent";
import NotFoundComponent from "./component/NotFoundComponent";
import WelcomeComponent from "./component/WelcomeComponent";
import AuthenticateGuard from "./guard/AuthenticateGuard";
import { AuthContextProvider } from "./security/AuthContext";
import("bootstrap");

export default function TodoApp() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <NavBarComponent />
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route
                        path="/welcome"
                        element={
                            <AuthenticateGuard>
                                <WelcomeComponent />
                            </AuthenticateGuard>
                        }
                    />
                    <Route
                        path="/todos"
                        element={
                            <AuthenticateGuard>
                                <ListTodosComponent />
                            </AuthenticateGuard>
                        }
                    />
                    <Route path="*" element={<NotFoundComponent />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}
