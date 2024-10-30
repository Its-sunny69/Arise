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
import { useSocket } from "../context/Socket";
const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [showRooms, setShowRooms] = useState([]);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const error = useSelector((state) => state.todos.error);
  const currentToken = useSelector((state) => state.todos.token);
  const navigate = useNavigate();
  const socket = useSocket();
  // console.log(todos);
  // console.log(currentToken);

  // const isLoggedin = !!currentToken;
  // console.log("isLoggedin", isLoggedin);

  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        roomCreatedData(response.payload.username);
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

  const roomCreatedData = async (username) => {
    try {
      const url = `http://localhost:3002/api/rooms/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("fetch", data);
      setShowRooms(data);
    } catch (error) {
      console.log(error, "Error while fetching all created rooms");
    }
  };

  console.log("showRooms", showRooms);
  console.log("Username", username);
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

  const timeAgo = (date) => {
    const now = Date.now();

    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? "an hour ago" : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? "a minute ago" : `${interval} minutes ago`;
    }

    return seconds === 1 ? "a second ago" : `${seconds} seconds ago`;
  };

  const handleRoomJoin = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleRoomDelete = async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setShowRooms(showRooms.filter((room) => room.roomId !== roomId));
      socket.emit("delete-room", roomId);
      console.log("id:", data.roomId);
    } catch (error) {
      console.log(error, "Error deleting room");
    }
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
      Created Rooms:
      <div className="flex flex-wrap">
        {showRooms.map((room) => (
          <div className="w-40 h-28 shadow-lg m-5 rounded-md">
            <p className="p-4">Joined:{room.users.length}</p>
            <p>Created:{timeAgo(room.createdAt)}</p>
            <div className=" flex justify-around">
              <button onClick={() => handleRoomJoin(room.roomId)}>Join</button>
              <button onClick={() => handleRoomDelete(room.roomId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
