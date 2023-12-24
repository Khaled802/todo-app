import { useEffect, useState } from "react";
import TodoApi from "../api/TodoApi";
import { useNavigate } from "react-router-dom";
import checkIcon from "../images/check.png";
import checkedIcon from "../images/checked.png";
import removeIcon from "../images/remove.png";
import { useAuthContext } from "../security/AuthContext";

const todosApi = new TodoApi();

export default function ListTodosComponent() {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const { getUsername } = useAuthContext()

    const getTodos = () => {
        todosApi
            .retrieveAll(getUsername())
            .then((response) => {
                console.log(response);
                setTodos(response.data);
            })
            .catch(() => setTodos([]));
    };

    useEffect(getTodos, []);

    const deleteTodo = (id) => {
        todosApi
            .delete(id)
            .then(() => getTodos())
            .catch(console.log);
    };

    const doneIcone = (done) => {
        return done ? checkedIcon : checkIcon;
    };

    const handleRowClick = (id) => {
        navigate(`/todos/${id}`);
    };

    const handleCreateClick = (id) => {
        navigate(`/todos/create`);
    };

    const isExpriredUndone = (todo) => {
        return (
            new Date() > new Date(todo.expiredDate.join("-")) &&
            todo.done === false
        );
    };

    return (
        <div className="listTodos container">
            <h1> Todos </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"> Title </th>
                        <th scope="col"> Description </th>
                        <th scope="col"> done </th>
                        <th scope="col"> Expired Date </th>
                        <th scope="col"> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td
                                onClick={() => handleRowClick(todo.id)}
                                style={{ cursor: "pointer" }}
                                className={
                                    isExpriredUndone(todo) && "text-danger"
                                }
                            >
                                {" "}
                                {todo.title}{" "}
                            </td>
                            <td
                                onClick={() => handleRowClick(todo.id)}
                                style={{ cursor: "pointer" }}
                                className={
                                    isExpriredUndone(todo) && "text-danger"
                                }
                            >
                                {" "}
                                {todo.description}{" "}
                            </td>

                            <td>
                                {" "}
                                <img
                                    src={doneIcone(todo.done)}
                                    alt="Logo"
                                    style={{ width: "30px", height: "auto" }}
                                />
                            </td>
                            <td> {todo.expiredDate.join("-")}</td>
                            <td>
                                {" "}
                                <button
                                    className="btn"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    {" "}
                                    <img
                                        src={removeIcon}
                                        alt="delete task"
                                        style={{
                                            width: "30px",
                                            height: "auto",
                                        }}
                                    />{" "}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleCreateClick}>
                    {" "}
                    create new todo
                </button>
            </div>
        </div>
    );
}
