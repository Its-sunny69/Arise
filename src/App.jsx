import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => setError(error));
  };

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const todoData = { name: newTodo }; // Create a new todo object

    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData), // Convert the object to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response JSON:', data);
        setTodos([...todos, data]); // Update the todos state with the new todo
        setNewTodo(""); // Clear the input field
      })
      .catch((error) => setError(error));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      {error && <p>Error fetching todos: {error.message}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.name}</li> // Adjust 'title' based on your data structure
        ))}
      </ul>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          required
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
