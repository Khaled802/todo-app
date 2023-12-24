import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../security/AuthContext";


export default function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate();

    const { authenticate } = useAuthContext();

    async function loginAction() {
        const isLogged = await authenticate(username, password)

        if (!isLogged) 
            return setFailedLogin(true);
        navigate("/welcome");
        setFailedLogin(false);
    }

    return (
        <div className="loginComponent container">
            <h1> Login </h1>
            <form className="loginForm form">

                {failedLogin && <h4> Wrong Login </h4>}

                <div className="mb-3">
                    <label className="form-label" htmlFor="username"> Username: </label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="passoword"> Passoword: </label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div className="d-grid gap-2">
                    <button type="button" onClick={loginAction} className="btn btn-primary"> Login </button>
                </div>
            </form>
        </div>
    );
}