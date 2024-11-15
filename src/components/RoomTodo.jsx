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
  const [checkedCount, setCheckedCount] = useState(0);
  const [roomCheckedCount, setRoomCheckedCount] = useState(0);
  const [socketTodo, setSocketTodo] = useState([]);
  const [socketAdminId, setSocketAdminId] = useState("");
  const dispatch = useDispatch();
  const username = useSelector((state) => state.todos.user?.username);
  const userId = useSelector((state) => state.todos.user?._id);
  const todos = useSelector((state) => state.roomTodos.roomTodos);
  const todoAdminId = useSelector((state) => state.roomTodos.adminId);
  const socket = useSocket();
  console.log("RoomTodo - userId: ", userId);

  useEffect(() => {
    socket.on("addTodo", (todos, todoAdminId) => {
      setSocketTodo(todos);
      setSocketAdminId(todoAdminId);
    });

    socket.on("updateTodo", (updatedTodo) => {
      // Update the local socketTodo state with the latest data
      setSocketTodo((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id
            ? { ...todo, checked: updatedTodo.checked }
            : todo
        )
      );
    });

    return () => {
      socket.off("addTodo");
      socket.off("updateTodo");
    };
  }, []);

  useEffect(() => {
    if (newTodoAdded || userId) {
      console.log("RoomTodojsx", userId);
      dispatch(getRoomTodos(userId));

      setNewTodoAdded(false); // Reset the flag after dispatching
    }
  }, [newTodoAdded, userId, dispatch]);

  useEffect(() => {
    socket.emit("todo", todos, roomData.roomId, todoAdminId);
  }, [todos, dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const todoData = { adminId: userId, title: newTodo }; // Create a new todo object

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
      adminId: userId,
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

  console.log("socketAdminId", socketAdminId);

  const handleCheckboxChanges = (todoId) => {
    const updatedCheckedBox = {
      adminId: socketAdminId,
      todoId,
      checkedById: userId,
    };

    dispatch(roomCheckBoxUpdate(updatedCheckedBox))
      .then((response) => {
        console.log("Response: ", response.payload.data);
        socket.emit("updateCheckbox", response.payload.data, roomData.roomId);
      })
      .catch((error) => {
        console.error("Error updating checkbox status of todo:", error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    const todoData = { adminId: userId, todoId };

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
      "ProgressChecked",
      todos.map((todo) => todo.checked)
    );
    const count = todos.reduce((accumulator, todo) => {
      return todo.checked?.includes(userId) ? accumulator + 1 : accumulator;
    }, 0);

    setCheckedCount(count);
  };

  useEffect(() => {
    progressCalculator();
  }, [todos]);

  console.log("socketTodo", socketTodo);
  console.log("Todo", todos);
  // console.log("checkCount", checkedCount);
  // console.log("roomCheckCount", roomCheckedCount);
  return (
    <>
      <div className=" border-2 border-black m-2 p-2">
        <h1>Task List</h1>

        <ProgressBar
          label={`progress`}
          currentValue={checkedCount}
          maxValue={todos.length}
        />

        {/* {error && <p>Error fetching todos: {error.message}</p>} */}
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
          ))}

          {username != roomData.createdBy &&
            socketTodo?.map((todo, index) => (
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
                  </>
                )}
              </li>
            ))}
        </ul>
        {username === roomData.createdBy && (
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
