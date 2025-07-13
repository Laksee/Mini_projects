import { useState } from "react";

export function Todos({ todos: todosData }) { // Rename prop to avoid confusion
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
                    <UpdateTodo todo = {todo}></UpdateTodo>
                </div>
            ))}
        </div>
    );
}

function UpdateTodo({ todo }){
    const [isCompleted, setIsCompleted] = useState(todo.completed)
    const [done,setDone] = useState(false)

    const handleUpdate = async () => {
        setDone(true)
        try{
            const response = await fetch("http://localhost:3000/completed",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                id: todo.id || todo._id,
                })
            })
            if (response.ok){
                setIsCompleted(true)
            }else{
                alert("Failed to update todo")
            }
        }catch(err) {
            console.error("Error updating the todo",err)
            alert("Something went wrong")
        }finally {
            setDone(false)
        }
    }
    return (
        <button onClick={handleUpdate} disabled= {isCompleted || done}>
            {isCompleted ? "Completed" : done ? "Updating" : "Mark as Done"}
        </button>
    )
}