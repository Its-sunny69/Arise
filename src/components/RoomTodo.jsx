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
  completedUpdate,
} from "../slice/roomTodosSlice";

import { useSocket } from "../context/Socket";
import { useParams } from "react-router-dom";

function RoomTodo({ roomData }) {
  const roomParamsId = useParams();
  const [newTodo, setNewTodo] = useState("");
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [socketTodo, setSocketTodo] = useState([]);
  const [socketRoomId, setSocketRoomId] = useState("");
  const [roomProgress, setRoomProgress] = useState();
  const [todoLength, setTodoLength] = useState();
  const [ranking, setRanking] = useState({});
  const dispatch = useDispatch();
  const username = useSelector((state) => state.todos.user?.username);
  const userId = useSelector((state) => state.todos.user?._id);
  const todos = useSelector((state) => state.roomTodos.roomTodos);
  const todoRoomId = useSelector((state) => {
    // console.log("State", state.roomTodos);
    return state.roomTodos.roomId;
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on("addTodo", (todos, roomId) => {
      if (roomId == roomData.roomId) {
        console.log("addTodo", todos);
        setSocketTodo(todos);
        setSocketRoomId(roomId);
      }
    });
    socket.emit("todo", todos, todoRoomId);

    return () => {
      socket.off("addTodo");
      socket.off("todo");
    };
  }, [todos, socket, roomData.roomId]);

  useEffect(() => {
    socket.on("updateTodo", (updatedTodo, roomId) => {
      // Update the local socketTodo state with the latest data
      if (roomId == roomData.roomId) {
        setSocketTodo((prevTodos) =>
          prevTodos.map((todo) => {
            return todo._id === updatedTodo._id
              ? { ...todo, checked: updatedTodo.checked }
              : todo;
          })
        );
      }
    });

    socket.on("room-progress", (count, roomId, todoLength) => {
      if (roomId == roomData.roomId) {
        setRoomProgress(count);
        setTodoLength(todoLength);
      }
    });

    return () => {
      // socket.off("addTodo");
      socket.off("updateTodo");
      socket.off("room-progress");
    };
  }, [todos]);

  useEffect(() => {
    if (newTodoAdded || roomData.roomId) {
      dispatch(getRoomTodos(roomData.roomId));

      setNewTodoAdded(false); // Reset the flag after dispatching
    }
  }, [newTodoAdded, roomData.roomId, dispatch]);

  // useEffect(() => {
  //   socket.emit("todo", todos, roomData.roomId, todoRoomId);
  // }, [todos, dispatch]);

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
        socket.emit("updateCheckbox", response.payload.data, todoRoomId);
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
    const count = socketTodo.reduce((accumulator, todo) => {
      return todo.checked?.includes(userId) ? accumulator + 1 : accumulator;
    }, 0);

    // setCheckedCount(count);
    socket.emit("progress", userId, count, roomData.roomId, socketTodo.length);
    // console.log("Count", count);
  };

  useEffect(() => {
    progressCalculator();
    handleRanking();
    completed();
  }, [socketTodo]);

  // useEffect(() => {
  //   handleRanking();
  // }, []);

  useEffect(() => {
    roomData.users?.forEach((user) => {
      setRanking((prev) => ({ ...prev, [user._id]: [0, user.username] }));
    });
  }, [roomData]);

  const handleRanking = () => {
    let arr = {};

    // Iterate over todos to calculate the count of checked items for each user
    socketTodo.forEach((todo) => {
      if (todo.checked?.length) {
        todo.checked.forEach((user) => {
          if (!arr[user]) {
            arr[user] = 0; // Initialize the user's count if not already present
          }
          arr[user] += 1; // Increment the count for each checkbox checked by the user
        });
      }
    });

    // Update the ranking state with the new values
    setRanking((prevRanking) => {
      // Create a copy of prevRanking and reset all counts to zero
      const updatedRanking = { ...prevRanking };
      Object.keys(updatedRanking).forEach((key) => {
        updatedRanking[key][0] = 0; // Reset all counts to zero
      });

      // Update counts based on the current arr
      Object.entries(arr).forEach(([key, val]) => {
        if (updatedRanking[key]) {
          updatedRanking[key][0] = val; // Update existing users
        } else {
          updatedRanking[key] = [val]; // Add new users
        }
      });

      // Sort updatedRanking by values in descending order
      const sortedRanking = Object.entries(updatedRanking)
        .sort(([, a], [, b]) => b[0] - a[0]) // Sort by the ranking value (descending)
        .reduce((acc, [key, val]) => {
          acc[key] = val;
          return acc;
        }, {});

      return sortedRanking;
    });
  };

  const completed = () => {
    const completed = socketTodo.every((todo) =>
      todo.checked?.includes(userId)
    );
    if (completed) {
      const completeData = { roomId: roomData.roomId, userId: userId };
      dispatch(completedUpdate(completeData)).then((response) => {
        socket.emit("points");
      });
    }
  };

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

        <ul>
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
                    onChange={() => handleCheckboxChanges(todo._id)}
                  />
                  {todo.title}
                  {userId == roomData.createdBy ? (
                    <>
                      <button
                        className="mx-2"
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

      <div className=" border-2 border-black m-2 p-2">
        <p>Ranking:</p>
        <br />
        {Object.entries(ranking).map(([_, val], index) => (
          <>
            <ol>
              <li key={index}>
                {index + 1}. {val[1]} - Task Compeleted: {val[0]}
              </li>
            </ol>
          </>
        ))}
      </div>
    </>
  );
}

export default RoomTodo;
