import { Link } from "react-router-dom";


export default function WelcomeComponent() {
    return (
        <div className="welcomeComponent container">
            <h1> Welcome to Todo App </h1>
            <Link to={"/todos"}> my todos</Link>
        </div>
    )
}
