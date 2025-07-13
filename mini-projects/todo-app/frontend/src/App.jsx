import { useState,useEffect } from 'react'

import { Todos } from './components/Todos'
import { CreateTodo } from './components/CreateTodo';




function App() {
  const [todos, setTodos] = useState([]);

 useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3000/todos");
        const data = await res.json();
        setTodos(data);
      } catch (e) {
        console.error("Failed to fetch todos:", e);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <CreateTodo></CreateTodo>
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App