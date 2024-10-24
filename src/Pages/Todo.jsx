import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  checkBoxUpdate,
  AuthUser,
} from "../features/todosSlice";
import ProgressBar from "../components/ProgressBar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const error = useSelector((state) => state.todos.error);
  const currentToken = useSelector((state) => state.todos.token);

  // console.log(todos);
  // console.log(currentToken);

  // const isLoggedin = !!currentToken;
  // console.log("isLoggedin", isLoggedin);

  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        setUserId(response.payload._id);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("todojsx", userId);
      dispatch(getTodos(userId));
    }
  }, [userId]);

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const todoData = { userId: userId, title: newTodo, checked: false }; // Create a new todo object

    dispatch(addTodo(todoData))
      .then((response) => {
        console.log("Todo Added", response.payload);
        setNewTodo(""); // Clear the input field
      })
      .catch((error) => setError(error));
  };

  const handleUpdateTodo = (id) => {
    const updatedTodo = { name: editValue, checked: false };
    dispatch(updateTodo({ id, updatedTodo }))
      .then((response) => {
        console.log("Response: ", response.payload.message);
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleCheckboxChanges = (id, todo) => {
    const currentChecked = todo.checked;

    dispatch(checkBoxUpdate({ id, currentChecked }))
      .then((response) => {
        console.log("Response: ", response.payload.message);
      })
      .catch((error) => {
        console.error("Error checked status of todo:", error);
      });
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
      .then((response) => {
        console.log(
          response.payload.data.message,
          ", id:",
          response.payload.id
        );
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleUpdateClick = (todoId, todoName) => {
    setEditId(todoId);
    setEditValue(todoName);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const progressCalculator = () => {
    // console.log(todos.map((todo) => todo.checked));
    const count = todos.reduce((accumulator, todo) => {
      return todo.checked ? accumulator + 1 : accumulator;
    }, 0);

    setCheckedCount(count);
  };

  useEffect(() => {
    progressCalculator();
  }, [todos]);

  // console.log(checkedCount);

  console.log(todos);

  const handleRoomClick = () => {
    navigate("/join-room");
  };

  const capitalizeString = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);

    const finalStr = firstLetter + remainingLetters;

    return finalStr;
  };

  return (
    <>
      <div className=" border-2 border-black m-2 p-2">
        <div className="flex justify-center">
          <div className="w-[80%] flex justify-between items-center mb-5 bg-slate-100 rounded-md shadow-sm">
            <div className="mx-4 font-semibold tracking-wider">
              Username: {capitalizeString(username)}
            </div>
            {<Navbar />}
          </div>
        </div>
        <h1>Todo List</h1>
        <ProgressBar
          label={"Progress"}
          currentValue={checkedCount}
          maxValue={todos.length}
        />
        {error && <p>Error fetching todos: {error.message}</p>}
        {/* <ul>
          {todos.map((todo, index) => (
            <li key={todo._id}>
              {editId == todo._id ? (
                <>
                  <input
                    type="text"
                    className="border border-black"
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
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheckboxChanges(todo._id, todo)}
                  />
                  {todo.name}{" "}
                  <button
                    className="m-2"
                    onClick={() => handleUpdateClick(todo._id, todo.name)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTodo(todo._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul> */}

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo.title}</li>
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

        <div className="my-4">
          <button
            className="px-4 py-2 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 text-sm font-medium text-white hover:scale-105 hover:opacity-70 transition-all duration-200 "
            onClick={handleRoomClick}
          >
            Create Room
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
