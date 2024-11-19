import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "./ProgressBar";
import AddCricleSvg from "../assets/add-circle-svg.svg";
import {
  getRoomTodos,
  addRoomTodo,
  updateRoomTodo,
  roomCheckBoxUpdate,
  deleteRoomTodo,
} from "../features/roomTodosSlice";

import { useSocket } from "../context/Socket";

function RoomTodo({ roomData }) {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [socketTodo, setSocketTodo] = useState([]);
  const [socketRoomId, setSocketRoomId] = useState("");
  const [roomProgress, setRoomProgress] = useState();
  const [todoLength, setTodoLength] = useState();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.todos.user?.username);
  const userId = useSelector((state) => state.todos.user?._id);
  const todos = useSelector((state) => state.roomTodos.roomTodos);
  const todoRoomId = useSelector((state) => state.roomTodos.roomId);
  const socket = useSocket();
  // console.log("RoomTodo - userId: ", userId);

  useEffect(() => {
    socket.on("addTodo", (todos, todoRoomId) => {
      setSocketTodo(todos);
      setSocketRoomId(todoRoomId);
    });

    socket.on("updateTodo", (updatedTodo) => {
      // console.log("updateTodo", updatedTodo);
      // Update the local socketTodo state with the latest data
      setSocketTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id
            ? { ...todo, checked: updatedTodo.checked }
            : todo
        )
      );
    });

    socket.on("room-progress", (count, todoLength) => {
      console.log("roomProgress", count);
      setRoomProgress(count);
      setTodoLength(todoLength);
    });

    return () => {
      socket.off("addTodo");
      socket.off("updateTodo");
      socket.off("room-progress");
    };
  }, [socketTodo, roomData]);

  useEffect(() => {
    if (newTodoAdded || roomData.roomId) {
      console.log("roomId", roomData.roomId)
      dispatch(getRoomTodos(roomData.roomId));

      setNewTodoAdded(false); // Reset the flag after dispatching
    }
  }, [newTodoAdded, roomData.roomId, dispatch]);

  useEffect(() => {
    socket.emit("todo", todos, roomData.roomId, todoRoomId);
  }, [todos, dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const todoData = { roomId: roomData.roomId, title: newTodo }; // Create a new todo object

    dispatch(addRoomTodo(todoData))
      .then((response) => {
        console.log("Todo Added", response.payload);
        setNewTodo(""); // Clear the input field
        setNewTodoAdded(true);
      })
      .catch((error) => setError(error));
  };

  const handleUpdateTodo = (todoId, title) => {
    const updatedTodo = {
      roomId: roomData.roomId,
      todoId: todoId,
      title: title,
      checked: [],
    };
    dispatch(updateRoomTodo(updatedTodo))
      .then((response) => {
        // console.log("UpdateTodo Response: ", response);
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleCheckboxChanges = (todoId) => {
    const updatedCheckedBox = {
      roomId: socketRoomId,
      todoId,
      checkedById: userId,
    };

    dispatch(roomCheckBoxUpdate(updatedCheckedBox))
      .then((response) => {
        // console.log("Response: ", response.payload.data);
        socket.emit("updateCheckbox", response.payload.data, roomData.roomId);
      })
      .catch((error) => {
        console.error("Error updating checkbox status of todo:", error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    const todoData = { roomId: roomData.roomId, todoId };

    dispatch(deleteRoomTodo(todoData))
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
    console.log(
      "ProgressCalculator",
      socketTodo.map((todo) => todo)
    );
    const count = socketTodo.reduce((accumulator, todo) => {
      return todo.checked?.includes(userId) ? accumulator + 1 : accumulator;
    }, 0);

    // setCheckedCount(count);
    socket.emit("progress", userId, count, roomData.roomId, socketTodo.length);
    console.log("Count", count);
  };

  useEffect(() => {
    progressCalculator();
  }, [socketTodo]);

  console.log("socketTodo", socketTodo);

  console.log(socketTodo.length);
  return (
    <>
      <div className=" border-2 border-black m-2 p-2">
        <h1>Task List</h1>
        {roomData.users?.map((user) => {
          return (
            <ProgressBar
              key={user._id}
              label={`${user.username}`}
              currentValue={roomProgress && roomProgress[user._id]}
              maxValue={todoLength}
            />
          );
        })}

        {/* {error && <p>Error fetching todos: {error.message}</p>} */}
        <ul>
          {/* {todos.map((todo, index) => (
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
                    checked={todo.checked.includes(userId)}
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
          ))} */}

          {socketTodo?.map((todo, index) => (
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
                    checked={todo.checked.includes(userId)}
                    onChange={() => handleCheckboxChanges(todo._id, todo)}
                  />
                  {todo.title}
                  {userId == roomData.createdBy ? (
                    <>
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
                  ) : null}
                </>
              )}
            </li>
          ))}
        </ul>
        {userId === roomData.createdBy && (
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
        )}
      </div>
    </>
  );
}

export default RoomTodo;
