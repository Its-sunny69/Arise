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
import ProgressBar from "./ProgressBar";
import AddCricleSvg from "../assets/add-circle-svg.svg";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);
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
    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUserId(response.payload._id);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  useEffect(() => {
    if (newTodoAdded || userId) {
      console.log("todojsx", userId);
      dispatch(getTodos(userId));
      setNewTodoAdded(false); // Reset the flag after dispatching
    }
  }, [newTodoAdded, userId, dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const todoData = { userId: userId, title: newTodo, checked: false }; // Create a new todo object

    dispatch(addTodo(todoData))
      .then((response) => {
        console.log("Todo Added", response.payload);
        setNewTodo(""); // Clear the input field
        setNewTodoAdded(true);
      })
      .catch((error) => setError(error));
  };

  const handleUpdateTodo = (todoId, title) => {
    const updatedTodo = {
      userId: userId,
      todoId: todoId,
      title: title,
      checked: false,
    };
    dispatch(updateTodo(updatedTodo))
      .then((response) => {
        // console.log("UpdateTodo Response: ", response);
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleCheckboxChanges = (todoId, todo) => {
    const currentChecked = todo.checked;

    const updatedCheckedBox = { userId, todoId, currentChecked };

    dispatch(checkBoxUpdate(updatedCheckedBox))
      .then((response) => {
        console.log("Response: ", response.payload);
      })
      .catch((error) => {
        console.error("Error checked status of todo:", error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    const todoData = { userId, todoId };

    dispatch(deleteTodo(todoData))
      .then((response) => {
        console.log("Response: ", response.payload);
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

  return (
    <>
      <div className=" border-2 border-black m-2 p-2">
        <h1>Task List</h1>
        <ProgressBar
          label={"Progress"}
          currentValue={checkedCount}
          maxValue={todos.length}
        />
        {error && <p>Error fetching todos: {error.message}</p>}

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
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
                    onClick={() => handleUpdateTodo(todo._id, editValue)}
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
                  {todo.title}
                  <button
                    className="m-2"
                    onClick={() => handleUpdateClick(todo._id, todo.title)}
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
        </ul>

        <div className="w-[20%] flex">
          <div className="w-4/5 py-1">
            <input
              type="text"
              className="w-full px-4 py-1 border rounded-l-lg text-gray-800 focus:outline-none focus:bg-slate-300"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add New Task"
              required
            />
          </div>
          <div className="w-1/5 flex justify-center items-center hover:opacity-60">
            <button
              className="w-full flex items-center bg-gradient-to-br from-blue-500 to-purple-400 text-sm font-medium text-white rounded-r-lg justify-center py-1.5 hover:scale-105 hover:opacity-70 transition-all duration-200"
              type="submit"
              onClick={handleAddTodo}
            >
              <img src={AddCricleSvg} className="w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
