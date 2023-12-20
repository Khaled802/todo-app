import { Link } from "react-router-dom";

export default function LogoutComponent() {

    return (
        <dir className="Container">
            <h1> Logged Out </h1>
            <p> to login again <Link to="/login"> login </Link> </p>
        </dir>
    )
}

