import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../security/AuthContext";


export default function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate();

    const { authenticate } = useAuthContext();

    function loginAction() {
        const isLogged = authenticate(username, password);

        if (!isLogged) 
            return setFailedLogin(true);
        navigate("/welcome");
        setFailedLogin(false);
    }

    return (
        <div className="loginComponent">
            <h1> Login </h1>
            <div className="loginForm container">

                {failedLogin && <h4> Wrong Login </h4>}

                <div className="container">
                    <label htmlFor="username"> Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passoword"> Passoword: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <button type="button" onClick={loginAction}> Login </button>
                </div>
            </div>
        </div>
    );
}