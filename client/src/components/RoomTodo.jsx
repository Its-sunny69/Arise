import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "./ProgressBar";
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
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  const dispatch = useDispatch();
  const username = useSelector((state) => state.todos.user?.username);
  const userId = useSelector((state) => state.todos.user?._id);
  const todos = useSelector((state) => state.roomTodos.roomTodos);
  const todosRoomId = useSelector((state) => state.roomTodos.roomId);

  const socket = useSocket();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    socket.on("addTodo", (todos, roomId) => {
      if (roomId == roomData.roomId) {
        setSocketTodo(todos);
        setSocketRoomId(roomId);
      }
    });

    if (todosRoomId == roomData.roomId) {
      socket.emit("todo", todos, roomData.roomId);
    }

    return () => {
      socket.off("addTodo");
    };
  }, [todos, socket, roomData.roomId]);

  useEffect(() => {
    socket.on("updateTodo", (updatedTodo, roomId) => {
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
      socket.off("updateTodo");
      socket.off("room-progress");
    };
  }, [todos, socketTodo]);

  useEffect(() => {
    if (newTodoAdded || roomData.roomId) {
      dispatch(getRoomTodos(roomData.roomId));

      setNewTodoAdded(false);
    }
  }, [newTodoAdded, roomData.roomId]);

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
        socket.emit("updateCheckbox", response.payload.data, roomData.roomId);
      })
      .catch((error) => {
        console.error("Error updating checkbox status of todo:", error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    const todoData = { roomId: roomData.roomId, todoId };

    dispatch(deleteRoomTodo(todoData));
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

    socket.emit("progress", userId, count, roomData.roomId, socketTodo.length);
  };

  const handleRanking = () => {
    let arr = {};

    socketTodo.forEach((todo) => {
      if (todo.checked?.length) {
        todo.checked.forEach((user) => {
          if (!arr[user]) {
            arr[user] = 0;
          }
          arr[user] += 1;
        });
      }
    });

    setRanking((prevRanking) => {
      const updatedRanking = {};
      roomData?.users?.forEach((user) => {
        const userId = user._id;
        const userCount = arr[userId] || 0;
        updatedRanking[userId] = [userCount, user.username];
      });

      const sortedRanking = Object.entries(updatedRanking)
        .sort(([, a], [, b]) => b[0] - a[0])
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
      <div className="sm:p-2">
        <div className="sm:my-8 my-4 text-center">
          <span className="title sm:text-5xl text-4xl">Task List</span>
        </div>

        <div className="flex justify-center items-center">
          {userId === roomData.createdBy && (
            <div className="sm:w-[30%] w-full my-5 flex">
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
          <ul className="sm:w-[80%] w-full flex flex-col justify-center items-center transition-all">
            <li className="w-full bg-gray-300 grid grid-flow-row gap-4 rounded-t-2xl">
              <div className="grid sm:grid-cols-8 grid-cols-5 my-3">
                <div className="sm:col-span-1 px-2 flex justify-center items-center font-bold">
                  Status
                </div>
                <div
                  className={`sm:col-span-5 col-span-2 flex justify-start items-center px-4 font-bold ${
                    userId == roomData.createdBy ? "border-x " : "border-l"
                  } border-black`}
                >
                  Task
                </div>

                {userId == roomData.createdBy ? (
                  <>
                    <div className="sm:col-span-1 flex justify-center items-center font-bold border-r border-black">
                      Edit
                    </div>
                    <div className="sm:col-span-1 px-2 flex justify-center items-center font-bold">
                      Delete
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </li>

            <div className="w-full">
              {socketTodo.length ? (
                socketTodo.map((todo, index) => (
                  <li
                    key={index}
                    className={`w-full grid grid-flow-row shadow-sm bg-white ${
                      index === socketTodo.length - 1 ? "rounded-b-2xl" : ""
                    }`}
                  >
                    {editId == todo._id ? (
                      <>
                        <div className="grid sm:grid-cols-8 grid-cols-5 bg-gray-100">
                          <div className="sm:col-span-1 flex justify-center items-center">
                            <Checkbox disabled />
                          </div>

                          <div className="sm:col-span-5 col-span-2 w-full px-4 flex justify-start items-center">
                            <input
                              type="text"
                              className="border-b border-gray-300 w-full focus:outline-none bg-gray-100"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                          </div>

                          <div className="sm:col-span-1 flex justify-center items-center">
                            <button
                              className="text-green-500 hover:scale-110 hover:text-green-400 transition-all active:scale-95"
                              onClick={() =>
                                handleUpdateTodo(todo._id, editValue)
                              }
                            >
                              <CheckRoundedIcon />
                            </button>
                          </div>

                          <div className="sm:col-span-1 flex justify-center items-center">
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
                          className={`grid sm:grid-cols-8 grid-cols-5 hover:bg-gray-100 transition-all ${
                            index === todos.length - 1 ? "rounded-b-2xl" : ""
                          }`}
                        >
                          <div className="sm:col-span-1 flex justify-center items-center">
                            <Checkbox
                              checked={todo.checked.includes(userId) ?? false}
                              onChange={() =>
                                handleCheckboxChanges(todo._id, todo)
                              }
                            />
                          </div>

                          <div
                            className={` flex justify-start items-center px-4 sm:col-span-5 col-span-2 transition-all ${
                              todo.checked.includes(userId)
                                ? "text-gray-500"
                                : ""
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
                              <div className="sm:col-span-1 flex justify-center items-center">
                                <button
                                  className="text-blue-500 hover:scale-110 hover:text-blue-400 transition-all active:scale-95"
                                  onClick={() =>
                                    handleUpdateClick(todo._id, todo.title)
                                  }
                                >
                                  <EditRoundedIcon />
                                </button>
                              </div>

                              <div className="sm:col-span-1 flex justify-center items-center">
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
                ))
              ) : (
                <li className="w-full shadow-sm bg-white rounded-b-2xl">
                  <div className="py-2 text-center rounded-b-2xl">
                    No Task Added
                  </div>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>

      <div className="sm:flex flex flex-col-reverse my-14 sm:p-2">
        <div className="sm:w-1/2 w-full">
          <div className="sm:mb-8 my-8 text-center">
            <span className="title sm:text-5xl text-4xl">Rank</span>
          </div>

          <div className="flex justify-center items-center">
            <ul className="sm:w-[90%] w-full bg-slate-50 border flex flex-col justify-center items-center rounded-2xl transition-all shadow-sm">
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
                      {phoneView ? (
                        <>
                          {index === 0 && <EmojiEventsTwoToneIcon />}
                          {index !== 0 && (
                            <span className="px-1">{index + 1}</span>
                          )}
                        </>
                      ) : (
                        <>
                          {index === 0 && (
                            <EmojiEventsTwoToneIcon className="absolute left-1" />
                          )}
                          <span className="px-1">{index + 1}</span>
                        </>
                      )}
                    </div>
                    <div className="relative bg-green col-span-3 flex justify-center items-center">
                      {phoneView ? (
                        <>
                        {val[1] === username && (
                            <p className="border  bg-blue-50 border-blue-700 rounded-full px-2 text-xs">
                              You
                            </p>
                          )}
                          {val[1] !== username && val[1]}
                        </>
                      ) : (
                        <>
                          {val[1] === username && (
                            <p className="border absolute left-2 bg-blue-50 border-blue-700 rounded-full px-2 text-xs">
                              You
                            </p>
                          )}
                          {val[1]}
                        </>
                      )}
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

        <div className="sm:w-1/2 w-full">
          <div className="sm:mb-8 mb-8 text-center">
            <span className="title sm:text-5xl text-4xl">Progress</span>
          </div>

          <div className="flex justify-center items-center">
            <ul className="sm:w-[90%] w-full bg-slate-50 border flex flex-col justify-center items-center rounded-2xl transition-all shadow-sm">
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
