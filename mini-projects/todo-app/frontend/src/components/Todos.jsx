export function Todos({ todos: todosData }){
    console.log("todosData", todosData);

    // Check if `todosData` is an object with a `todos` array
    if (!Array.isArray(todosData.todos)) {
        return <div>No todos to show</div>;
    }

    const todos = todosData.todos;

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id || todo._id}> 
                    <h2>{todo.title}</h2>
                    <h2>{todo.description}</h2>
                    <button>
                        {todo.completed ? "Completed" : "Mark as complete"}
                    </button>
                </div>
            ))}
        </div>
    );
}
