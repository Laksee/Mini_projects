import { useState,useEffect } from 'react'

import { Todos } from './components/todos'
import { CreateTodo } from './components/CreateTodo';




function App() {
  const [todos, setTodos] = useState([]);

 useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const data = await res.json();
        setTodos(data);
      })
      .catch((e) => {
        console.error("Failed to fetch todos:", e);
      });
  }, []);

  return (
    <div>
      <CreateTodo></CreateTodo>
      <Todos todos={todos}></Todos>
    </div>
  )
}

export default App