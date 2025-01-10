import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  checkBoxUpdate,
  AuthUser,
} from "../slice/todosSlice";
import ProgressBar from "./ProgressBar";
import AddCricleSvg from "../assets/add-circle-svg.svg";
import AddSvg from "../assets/add-svg.svg";
import Checkbox from "@mui/material/Checkbox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import SvgIcon from "@mui/icons-material/EditRounded";
import { Skeleton } from "@mui/material";
import { Fade } from "react-awesome-reveal";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [checkedCount, setCheckedCount] = useState(0);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const status = useSelector((state) => state.todos.status);
  const todos = useSelector((state) => state.todos.todos);
  const error = useSelector((state) => state.todos.error);
  const currentToken = useSelector((state) => state.todos.token);

  // console.log(todos);
  // console.log(currentToken);

  // const isLoggedin = !!currentToken;
  // console.log("isLoggedin", isLoggedin);
  // console.log("status", status)

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
      // console.log("todojsx", userId);
      dispatch(getTodos(userId));
      setNewTodoAdded(false); // Reset the flag after dispatching
    }
  }, [newTodoAdded, userId, dispatch]);

  const handleOrderChange = (newOrder) => {
    dispatch(reorderTodos(newOrder)); // Dispatch the new order to the Redux store
  };

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const todoData = { userId: userId, title: newTodo, checked: false }; // Create a new todo object

    dispatch(addTodo(todoData))
      .then((response) => {
        // console.log("Todo Added", response.payload);
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
        // console.log("Response: ", response.payload);
      })
      .catch((error) => {
        console.error("Error checked status of todo:", error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    const todoData = { userId, todoId };

    dispatch(deleteTodo(todoData))
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
    // console.log(
    //   "prgressChecked",
    //   todos.map((todo) => todo.checked)
    // );
    const count = todos.reduce((accumulator, todo) => {
      return todo.checked ? accumulator + 1 : accumulator;
    }, 0);

    setCheckedCount(count);
  };

  useEffect(() => {
    progressCalculator();
  }, [todos]);

  // console.log("checkedCount", checkedCount);
  return (
    <>
      <Fade
        cascade
        damping={0.5}
        delay={200}
        duration={1000}
        triggerOnce
        fraction={0.5}
      >
        <div className="my-14">
          <div className="my-8 text-center">
            <span className="title text-5xl">Your Today's Task</span>
          </div>

          {error && <p>Error fetching todos: {error.message}</p>}

          <div className="flex justify-center items-center">
            <div className="flex w-[80%] justify-between items-center my-4">
              <div className="w-[40%] flex">
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
                    onClick={
                      newTodo.trim().length > 0 ? handleAddTodo : () => {}
                    }
                  >
                    <img src={AddSvg} className="transition-all py-1" />
                  </button>
                </div>
              </div>

              <div className="w-[40%]">
                <ProgressBar
                  label={"Progress"}
                  currentValue={checkedCount}
                  maxValue={todos.length}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <ul className="w-[80%] flex flex-col justify-center items-center transition-all">
              <li className="w-full bg-gray-300 grid grid-flow-row gap-4 rounded-t-2xl">
                <div className="grid grid-cols-8 my-3">
                  <div className="col-span-1 flex justify-center items-center font-bold">
                    Status
                  </div>
                  <div className="col-span-5 flex justify-start items-center px-4 font-bold border-x border-black">
                    Task
                  </div>
                  <div className="col-span-1 flex justify-center items-center font-bold border-r border-black">
                    Edit
                  </div>
                  <div className="col-span-1 flex justify-center items-center font-bold">
                    Delete
                  </div>
                </div>
              </li>

              {todos.map((todo, index) => (
                <li
                  key={todo._id}
                  className={`w-full grid grid-flow-row shadow-sm ${
                    index === todos.length - 1 ? "rounded-b-2xl" : ""
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
                        className={`grid grid-cols-8 hover:bg-gray-100 bg-white transition-all ${
                          index === todos.length - 1 ? "rounded-b-2xl" : ""
                        }`}
                      >
                        <div className="col-span-1 flex justify-center items-center">
                          <Checkbox
                            checked={todo.checked ?? false}
                            onChange={() =>
                              handleCheckboxChanges(todo._id, todo)
                            }
                          />
                        </div>

                        <div
                          className={` flex justify-start items-center px-4 col-span-5 transition-all ${
                            todo.checked ? "text-gray-500" : ""
                          }`}
                        >
                          <div className="relative w-fit">
                            {todo.title}
                            <span
                              className={`absolute left-0 bottom-[45%] w-full h-[2px] bg-black transition-transform duration-500 ${
                                todo.checked
                                  ? "scale-x-100 bg-gray-500"
                                  : "scale-x-0"
                              }`}
                            />
                          </div>
                        </div>

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
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Todo;
