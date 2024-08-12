import React, { useState, useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

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
        console.log("Response JSON:", data);
        setTodos([...todos, data]); // Update the todos state with the new todo
        setNewTodo(""); // Clear the input field
      })
      .catch((error) => setError(error));
  };

  const handleUpdateTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editValue }), // Send the updated title
    })
      .then((response) => {
        console.log("Response Status:", response.status); // Log the response status
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response: ", data);
        handleCancelEdit();
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleUpdateClick = (todoId, todoName) => {
    setEditId(todoId);
    setEditValue(todoName);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <>
      <div className="App border-2 border-black m-2">
        <h1>Todo List</h1>
        {error && <p>Error fetching todos: {error.message}</p>}
        <ul>
          {todos.map((todo, index) => (
            <li key={todo._id}>
              {editId == todo._id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    className="m-2"
                    onClick={() => handleUpdateTodo(todo._id)}
                  >
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  {todo.name}{" "}
                  <button
                    className="m-2"
                    onClick={() => handleUpdateClick(todo._id, todo.name)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            required
          />
          <button type="submit" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
