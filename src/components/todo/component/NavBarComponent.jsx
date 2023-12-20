import { Link } from "react-router-dom";
import { useAuthContext } from "../security/AuthContext";

export default function NavBarComponent() {
    const { isAuth } = useAuthContext();

    const { removeAuthentication } = useAuthContext();

    const logout = ()=> removeAuthentication(); 

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="https://github.com">Todo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              { isAuth() && <Link className="nav-link" to="/welcome">Welcome</Link> }
            </li>
            <li className="nav-item">
              { isAuth() && <Link className="nav-link" to="/todos">Todos</Link> }
            </li>
          </ul>
        </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              { !isAuth() && <Link className="nav-link" to="/login">Login</Link> }
            </li>
            <li className="nav-item">
              { isAuth() && <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link> }
            </li>
          </ul>
      </div>
    </nav>
  );
}