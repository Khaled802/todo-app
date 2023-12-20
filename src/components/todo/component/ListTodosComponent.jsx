

export default function ListTodosComponent() {
    const todos = [
        { id: 1, description: "Learn Java", done: true, expired: new Date() },
        { id: 2, description: "Learn AWS", done: false, expired: new Date() },
        { id: 3, description: "Learn Spring boot", done: false, expired: new Date() },
    ]

    return (
        <div className="listTodos container">
            <h1> Todos </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"> Description </th>
                        <th scope="col"> done </th>
                        <th scope="col"> Expired Date </th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                         <tr key={todo.id}>
                            <td> {todo.description} </td>
                            <td> {todo.done.toString()}</td>
                            <td> {todo.expired.toUTCString()}</td>
                         </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}