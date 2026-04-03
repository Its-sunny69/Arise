import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ProgressBar from "../../../shared/components/ProgressBar";
import AddSvg from "../../../assets/add-svg.svg";
import {
  getRoomTodos,
  addRoomTodo,
  updateRoomTodo,
  roomCheckBoxUpdate,
  deleteRoomTodo,
  completedUpdate,
} from "../roomTodosSlice";

import { useSocket } from "../../../context/Socket";
import Checkbox from "@mui/material/Checkbox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import { Switch } from "@mui/material";
import { Cancel, Correct, Delete, Edit } from "@/assets/icons";

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
  const [phoneView, setPhoneView] = useState(window.innerWidth < 1100);

  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user.username);
  const userId = useSelector((state) => state.auth.user._id);
  const todos = useSelector((state) => state.roomTodos.roomTodos);
  const todosRoomId = useSelector((state) => state.roomTodos.roomId);

  const socket = useSocket();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (newTodoAdded || roomData.roomId) {
      dispatch(getRoomTodos(roomData.roomId));

      setNewTodoAdded(false);
    }
  }, [newTodoAdded, socket, dispatch, roomData.roomId]);

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
  }, [todos, socket, todosRoomId, roomData.roomId]);

  useEffect(() => {
    socket.on("updateTodo", (updatedTodo, roomId) => {
      if (roomId == roomData.roomId) {
        setSocketTodo((prevTodos) =>
          prevTodos.map((todo) => {
            return todo._id === updatedTodo?._id
              ? { ...todo, checked: updatedTodo.checked }
              : todo;
          }),
        );

        const newUpdatedTodo = {
          roomId: roomId,
          todoId: updatedTodo._id,
          title: updatedTodo.title,
          checked: updatedTodo.checked,
        };
        dispatch(updateRoomTodo(newUpdatedTodo));
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
      .then(() => {
        setNewTodo("");
        setNewTodoAdded(true);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const handleUpdateTodo = (todoId, title) => {
    const updatedTodo = {
      roomId: roomData.roomId,
      todoId: todoId,
      title: title,
      checked: [],
    };
    dispatch(updateRoomTodo(updatedTodo))
      .then(() => {
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

    setRanking(() => {
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
      todo.checked?.includes(userId),
    );
    if (completed) {
      const completeData = { roomId: roomData.roomId, userId: userId };
      dispatch(completedUpdate(completeData)).then(() => {
        socket.emit("points");
      });
    }
  };

  const rankingEntries = Object.entries(ranking);

  return (
    <div className="my-10 sm:my-14">
      <div className="my-8 text-center">
        <span className="font-title text-5xl">Task List</span>
      </div>

      {userId === roomData.createdBy && (
        <div className="my-5 flex items-center justify-center">
          <div className="flex w-full sm:w-[30%]">
            {/* <div className="w-5/6 py-1">
                <input
                  type="text"
                  className="w-full rounded-tl-lg border-black bg-slate-50 px-4 py-1 text-gray-800 shadow-sm focus:bg-slate-100 focus:outline-dotted"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add New Task"
                  required
                />
              </div> */}
            <div className="my-1 flex w-full rounded-full">
              <div className="flex w-full gap-2 rounded-full border-2 border-white bg-white/40 py-2 pl-4 pr-2 shadow-[0px_0px_14px_6px_#ffffff1f] transition-all focus-within:outline-dotted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gray-400">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add New Task"
                  required
                />

                <button
                  className="flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:opacity-70 active:scale-95"
                  type="submit"
                  onClick={newTodo.trim().length > 0 ? handleAddTodo : () => {}}
                >
                  Add
                </button>
              </div>
            </div>

            {/* <div className="group flex w-1/6 items-center justify-center">
                <button
                  className="flex w-full items-center justify-center rounded-tr-lg bg-black py-[5.6px] text-sm font-medium text-white shadow-sm transition-all hover:opacity-70 active:scale-95"
                  type="submit"
                  onClick={newTodo.trim().length > 0 ? handleAddTodo : () => {}}
                >
                  <img src={AddSvg} className="py-1 transition-all" />
                </button>
              </div> */}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center">
        <ul className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-white shadow-[0px_0px_14px_6px_#ffffff1f] transition-all lg:w-[80%]">
          <li className="grid w-full grid-flow-row gap-4 rounded-t-xl border-b-2 border-white bg-[#cce4f1]">
            <div className="grid grid-cols-5 sm:grid-cols-8">
              <div className="flex items-center justify-center p-2 font-bold sm:col-span-1">
                Status
              </div>
              <div
                className={`col-span-2 ${userId === roomData.createdBy ? "border-x-2 sm:col-span-5" : "border-l-2 sm:col-span-7"} flex items-center justify-start border-white p-2 px-4 font-bold`}
              >
                Task
              </div>

              {userId == roomData.createdBy ? (
                <>
                  <div className="flex items-center justify-center border-r-2 border-white p-2 font-bold sm:col-span-1">
                    Edit
                  </div>
                  <div className="flex items-center justify-center p-2 font-bold sm:col-span-1">
                    Delete
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </li>

          <div className="w-full">
            {socketTodo && socketTodo.length ? (
              socketTodo.map((todo, index) => (
                <li
                  key={todo._id}
                  className={`grid w-full grid-flow-row bg-white/50 backdrop-blur-md ${
                    index === todos.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
                  <div
                    className={`grid grid-cols-5 transition-all sm:grid-cols-8 ${
                      index === todos.length - 1 ? "rounded-b-xl" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center p-2 sm:col-span-1">
                      {editId === todo._id ? (
                        <Checkbox checked={todo.checked ?? false} disabled />
                      ) : (
                        <Checkbox
                          control={<Switch />}
                          checked={todo.checked?.includes(userId) ?? false}
                          onChange={() => handleCheckboxChanges(todo._id, todo)}
                        />
                      )}
                    </div>

                    <div
                      className={`col-span-2 ${userId === roomData.createdBy ? "border-x-2 sm:col-span-5" : "border-l-2 sm:col-span-7"} flex items-center justify-start border-white px-4 py-2 transition-all`}
                    >
                      {editId === todo._id ? (
                        <input
                          type="text"
                          className="w-full border-b-2 border-[#c6dbef] bg-transparent focus:outline-none"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                      ) : (
                        <div
                          className={`relative w-fit ${
                            todo.checked?.includes(userId)
                              ? "text-gray-500"
                              : ""
                          }`}
                        >
                          {todo.title}
                          <span
                            className={`absolute bottom-[45%] left-0 h-[2px] w-full bg-black transition-transform duration-500 ${
                              todo.checked?.includes(userId)
                                ? "scale-x-100 bg-gray-500"
                                : "scale-x-0"
                            }`}
                          />
                        </div>
                      )}
                    </div>

                    {userId == roomData.createdBy && (
                      <>
                        <div className="flex items-center justify-center border-r-2 border-white p-2 sm:col-span-1">
                          {editId === todo._id ? (
                            <button
                              className="transition-all hover:scale-110 hover:opacity-75 active:scale-95"
                              onClick={() =>
                                handleUpdateTodo(todo._id, editValue)
                              }
                            >
                              <img
                                src={Correct}
                                alt="Update"
                                width={25}
                                height={25}
                              />
                            </button>
                          ) : (
                            <button
                              className="text-blue-500 transition-all hover:scale-110 hover:text-blue-400 active:scale-95"
                              onClick={() =>
                                handleUpdateClick(todo._id, todo.title)
                              }
                            >
                              <img
                                src={Edit}
                                alt="Edit"
                                width={25}
                                height={25}
                              />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center justify-center p-2 sm:col-span-1">
                          {editId === todo._id ? (
                            <button
                              className="transition-all hover:scale-110 hover:opacity-75 active:scale-95"
                              onClick={handleCancelEdit}
                            >
                              <img
                                src={Cancel}
                                alt="Cancel"
                                width={25}
                                height={25}
                              />
                            </button>
                          ) : (
                            <button
                              className="text-red-500 transition-all hover:scale-110 hover:text-red-400 active:scale-95"
                              onClick={() => handleDeleteTodo(todo._id)}
                            >
                              <img
                                src={Delete}
                                alt="Delete"
                                width={25}
                                height={25}
                              />
                            </button>
                          )}
                        </div>{" "}
                      </>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="w-full rounded-b-xl bg-white/50 text-center backdrop-blur-md">
                <div className="rounded-b-xl p-4 text-center">
                  No Task Added
                </div>
              </li>
            )}
          </div>
        </ul>
      </div>

      <div className="my-10 flex flex-col-reverse sm:my-14 sm:flex-row sm:p-2">
        <div className="w-full sm:w-1/2">
          <div className="my-5 text-center sm:mb-8">
            <span className="font-title text-4xl sm:text-5xl">Rank</span>
          </div>

          <div className="flex items-center justify-center">
            <ul className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff3b] backdrop-blur-lg transition-all lg:w-[90%]">
              <li className="grid w-full grid-flow-row gap-4 rounded-t-xl border-b-2 border-white">
                <div className="grid grid-cols-8">
                  <div className="col-span-2 flex items-center justify-center p-2 font-bold">
                    Rank
                  </div>
                  <div className="col-span-3 flex items-center justify-center p-2 px-4 font-bold">
                    Username
                  </div>
                  <div className="col-span-3 flex items-center justify-center p-2 font-bold">
                    Task Completed
                  </div>
                </div>
              </li>

              {rankingEntries.map(([userId, val], index) => (
                <li
                  key={userId}
                  className={`grid w-full grid-flow-row py-2 hover:opacity-70 ${
                    index === rankingEntries.length - 1 ? "rounded-b-2xl" : ""
                  } ${
                    index === 0 ? "bg-yellow-200 font-bold text-yellow-600" : ""
                  } ${
                    val[1] === username
                      ? "bg-blue-100 font-bold text-blue-700"
                      : ""
                  } `}
                >
                  <div className="grid grid-cols-8">
                    <div className="relative col-span-2 flex items-center justify-center">
                      {phoneView ? (
                        <>
                          {index === 0 && <EmojiEventsTwoToneIcon />}
                          {index !== 0 && (
                            <span className="px-1">{index + 1}</span>
                          )}
                        </>
                      ) : (
                        <>
                          {index === 0 ? (
                            <EmojiEventsTwoToneIcon />
                          ) : (
                            <span className="px-1">{index + 1}</span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="bg-green relative col-span-3 flex items-center justify-center">
                      {phoneView ? (
                        <>
                          {val[1] === username && (
                            <p className="rounded-full border border-blue-700 bg-blue-50 px-2 text-xs">
                              You
                            </p>
                          )}
                          {val[1] !== username && val[1]}
                        </>
                      ) : (
                        <>
                          {val[1] === username ? (
                            <p
                              className={`rounded-full px-3 text-sm ${
                                index === 0
                                  ? "border border-yellow-600 bg-yellow-100 font-bold text-yellow-600"
                                  : "border border-blue-600 bg-blue-50 font-bold text-blue-600"
                              }`}
                            >
                              You
                            </p>
                          ) : (
                            val[1]
                          )}
                        </>
                      )}
                    </div>
                    <div className="col-span-3 flex items-center justify-center">
                      {val[0]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="my-5 text-center sm:mb-8">
            <span className="font-title text-4xl sm:text-5xl">Progress</span>
          </div>

          <div className="flex items-center justify-center">
            <ul className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff3b] backdrop-blur-lg transition-all lg:w-[90%]">
              <li className="grid w-full grid-flow-row gap-4 rounded-t-xl border-b-2 border-white">
                <div className="flex items-center justify-center p-2 font-bold">
                  User&apos;s Progress
                </div>
              </li>

              {roomData.users?.map((user, index) => {
                return (
                  <li
                    key={index}
                    className={`grid w-full grid-flow-row px-4 py-2 transition-all hover:opacity-70 ${
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
    </div>
  );
}

RoomTodo.propTypes = {
  roomData: PropTypes.shape({
    roomId: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

export default RoomTodo;
