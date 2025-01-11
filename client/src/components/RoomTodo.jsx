import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "./ProgressBar";
import { v4 as uuidv4 } from "uuid";
import AddCricleSvg from "../assets/add-circle-svg.svg";
import AddSvg from "../assets/add-svg.svg";
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
import Checkbox from "@mui/material/Checkbox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";

function RoomTodo({ roomData }) {
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
    return state.roomTodos.roomId;
  });
  const socket = useSocket();

  useEffect(() => {
    socket.on("addTodo", (todos, roomId) => {
      if (roomId == roomData.roomId) {
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
  }, [todos, socketTodo]);

  useEffect(() => {
    if (newTodoAdded || roomData.roomId) {
      dispatch(getRoomTodos(roomData.roomId));

      setNewTodoAdded(false);
    }
  }, [newTodoAdded, roomData.roomId, dispatch]);

  useEffect(() => {
    progressCalculator();
    handleRanking();
    completed();
  }, [socketTodo, roomData]);

  useEffect(() => {
    roomData.users?.forEach((user) => {
      setRanking((prev) => ({ ...prev, [user._id]: [0, user.username] }));
    });
  }, [roomData]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const todoData = { roomId: roomData.roomId, title: newTodo };

    dispatch(addRoomTodo(todoData))
      .then((response) => {
        // console.log("Todo Added", response.payload);
        setNewTodo("");
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
        // console.log("Response: ", response.payload);
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
  };

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
      const updatedRanking = {};
      roomData?.users?.forEach((user) => {
        const userId = user._id;
        const userCount = arr[userId] || 0; // Use 0 if user has no checked todos
        updatedRanking[userId] = [userCount, user.username];
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

  const rankingEntries = Object.entries(ranking);

  return (
    <>
      <div className="p-2">
        <div className="my-8 text-center">
          <span className="title text-5xl">Task List</span>
        </div>

        <div className="flex justify-center items-center">
          {userId === roomData.createdBy && (
            <div className="w-[30%] my-5 flex">
              <div className="w-5/6 py-1">
                <input
                  type="text"
                  className="w-full px-4 py-1 border-black rounded-tl-lg text-gray-800 focus:outline-dotted focus:bg-slate-100 bg-slate-50 shadow-sm"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add New Task"
                  required
                />
              </div>
              <div className="w-1/6 flex justify-center items-center group">
                <button
                  className="w-full flex items-center bg-black text-sm font-medium text-white rounded-tr-lg justify-center py-[5.6px] hover:opacity-70 shadow-sm active:scale-95 transition-all"
                  type="submit"
                  onClick={newTodo.trim().length > 0 ? handleAddTodo : () => {}}
                >
                  <img src={AddSvg} className="transition-all py-1" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center">
          <ul className="w-[80%] flex flex-col justify-center items-center transition-all">
            <li className="w-full bg-gray-300 grid grid-flow-row gap-4 rounded-t-2xl">
              <div className="grid grid-cols-8 my-3">
                <div className="col-span-1 px-2 flex justify-center items-center font-bold">
                  Status
                </div>
                <div
                  className={`col-span-5 flex justify-start items-center px-4 font-bold ${
                    userId == roomData.createdBy ? "border-x " : "border-l"
                  } border-black`}
                >
                  Task
                </div>

                {userId == roomData.createdBy ? (
                  <>
                    <div className="col-span-1 flex justify-center items-center font-bold border-r border-black">
                      Edit
                    </div>
                    <div className="col-span-1 px-2 flex justify-center items-center font-bold">
                      Delete
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </li>

            <div className="w-full">
              {socketTodo.map((todo, index) => (
                <li
                  key={index}
                  className={`w-full grid grid-flow-row shadow-sm bg-white ${
                    index === socketTodo.length - 1 ? "rounded-b-2xl" : ""
                  }`}
                >
                  {editId == todo._id ? (
                    <>
                      <div className="grid grid-cols-8 bg-gray-100">
                        <div className="col-span-1 flex justify-center items-center">
                          <Checkbox disabled />
                        </div>

                        <div className="col-span-5 w-full px-4 flex justify-start items-center">
                          <input
                            type="text"
                            className="border-b border-gray-300 w-full focus:outline-none bg-gray-100"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        </div>

                        <div className="col-span-1 flex justify-center items-center">
                          <button
                            className="text-green-500 hover:scale-110 hover:text-green-400 transition-all active:scale-95"
                            onClick={() =>
                              handleUpdateTodo(todo._id, editValue)
                            }
                          >
                            <CheckRoundedIcon />
                          </button>
                        </div>

                        <div className="col-span-1 flex justify-center items-center">
                          <button
                            className="text-red-500 hover:scale-110 hover:text-red-400 transition-all active:scale-95"
                            onClick={handleCancelEdit}
                          >
                            <CloseRoundedIcon />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`grid grid-cols-8 hover:bg-gray-100 transition-all ${
                          index === todos.length - 1 ? "rounded-b-2xl" : ""
                        }`}
                      >
                        <div className="col-span-1 flex justify-center items-center">
                          <Checkbox
                            checked={todo.checked.includes(userId) ?? false}
                            onChange={() =>
                              handleCheckboxChanges(todo._id, todo)
                            }
                          />
                        </div>

                        <div
                          className={` flex justify-start items-center px-4 col-span-5 transition-all ${
                            todo.checked.includes(userId) ? "text-gray-500" : ""
                          }`}
                        >
                          <div className="relative w-fit">
                            {todo.title}
                            <span
                              className={`absolute left-0 bottom-[45%] w-full h-[2px] bg-black transition-transform duration-500 ${
                                todo.checked.includes(userId)
                                  ? "scale-x-100 bg-gray-500"
                                  : "scale-x-0"
                              }`}
                            />
                          </div>
                        </div>
                        {userId == roomData.createdBy ? (
                          <>
                            <div className="col-span-1 flex justify-center items-center">
                              <button
                                className="text-blue-500 hover:scale-110 hover:text-blue-400 transition-all active:scale-95"
                                onClick={() =>
                                  handleUpdateClick(todo._id, todo.title)
                                }
                              >
                                <EditRoundedIcon />
                              </button>
                            </div>

                            <div className="col-span-1 flex justify-center items-center">
                              <button
                                className="text-red-500 hover:scale-110 hover:text-red-400 transition-all active:scale-95"
                                onClick={() => handleDeleteTodo(todo._id)}
                              >
                                <DeleteRoundedIcon />
                              </button>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>

      <div className="flex my-14 p-2">
        <div className="w-1/2">
          <div className="mb-8 text-center">
            <span className="title text-5xl">Rank</span>
          </div>

          <div className="flex justify-center items-center">
            <ul className="w-[90%] bg-slate-50 border flex flex-col justify-center items-center rounded-2xl transition-all shadow-sm">
              <li className="w-full  grid grid-flow-row gap-4 rounded-t-2xl border-b-2">
                <div className="grid grid-cols-7 my-3">
                  <div className="col-span-1 flex justify-center items-center font-bold">
                    Rank
                  </div>
                  <div className="col-span-3 flex justify-center items-center px-4 font-bold">
                    Username
                  </div>
                  <div className="col-span-3 flex justify-center items-center font-bold">
                    Task Completed
                  </div>
                </div>
              </li>

              {rankingEntries.map(([_, val], index) => (
                <li
                  key={index}
                  className={`w-full grid grid-flow-row hover:opacity-70 py-2 ${
                    index === rankingEntries.length - 1 ? "rounded-b-2xl" : ""
                  } ${
                    index === 0 ? "bg-green-200 text-green-700 font-bold" : ""
                  }
                      ${
                        val[1] === username
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : ""
                      } `}
                >
                  <div className="grid grid-cols-7">
                    <div className="relative col-span-1 flex justify-center items-center">
                      {index === 0 && (
                        <EmojiEventsTwoToneIcon className="absolute left-1" />
                      )}
                      <span className="px-1">{index + 1}</span>
                    </div>
                    <div className="relative bg-green col-span-3 flex justify-center items-center">
                      {val[1] === username && (
                        <p className="border absolute left-2 bg-blue-50 border-blue-700 rounded-full px-2 text-xs">
                          You
                        </p>
                      )}
                      {val[1]}
                    </div>
                    <div className="col-span-3 flex justify-center items-center">
                      {val[0]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-8 text-center">
            <span className="title text-5xl">Progress</span>
          </div>

          <div className="flex justify-center items-center">
            <ul className="w-[90%] bg-slate-50 border flex flex-col justify-center items-center rounded-2xl transition-all shadow-sm">
              <li className="w-full  grid grid-flow-row gap-4 rounded-t-2xl border-b-2">
                <div className="my-3 flex justify-center items-center font-bold">
                  User's Progress
                </div>
              </li>
              {roomData.users?.map((user, index) => {
                return (
                  <li
                    key={index}
                    className={`w-full grid grid-flow-row hover:opacity-70 py-2 px-4 transition-all ${
                      index === roomData.users?.length - 1
                        ? "rounded-b-2xl"
                        : ""
                    }`}
                  >
                    <div>
                      <ProgressBar
                        key={user._id}
                        label={`${user.username}`}
                        currentValue={roomProgress && roomProgress[user._id]}
                        maxValue={todoLength}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomTodo;
