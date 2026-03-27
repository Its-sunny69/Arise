import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  checkBoxUpdate,
} from "../../../features/todo/todosSlice";
import ProgressBar from "../../../shared/components/ProgressBar";
import AddSvg from "../../../assets/add-svg.svg";
import Checkbox from "@mui/material/Checkbox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Fade } from "react-awesome-reveal";
import { Cancel, Correct, Delete, Edit } from "@/assets/icons";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const error = useSelector((state) => state.todos.error);
  const userId = useSelector((state) => state.auth.user._id);
  const checkedCount = todos.reduce((accumulator, todo) => {
    return todo.checked ? accumulator + 1 : accumulator;
  }, 0);

  useEffect(() => {
    if (newTodoAdded || userId) {
      dispatch(getTodos(userId));
      setNewTodoAdded(false);
    }
  }, [newTodoAdded, userId, dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const todoData = { userId: userId, title: newTodo, checked: false };

    dispatch(addTodo(todoData))
      .then(() => {
        setNewTodo("");
        setNewTodoAdded(true);
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const handleUpdateTodo = (todoId, title) => {
    const updatedTodo = {
      userId: userId,
      todoId: todoId,
      title: title,
      checked: false,
    };
    // console.log("handleUpdateTodo - updatedTodo:", updatedTodo);
    dispatch(updateTodo(updatedTodo))
      .then(() => {
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleCheckboxChanges = (todoId, todo) => {
    const currentChecked = todo.checked;

    const updatedCheckedBox = { userId, todoId, currentChecked };

    // console.log(
    //   "handleCheckboxChanges - updatedCheckedBox:",
    //   updatedCheckedBox,
    // );

    dispatch(checkBoxUpdate(updatedCheckedBox));
  };

  const handleDeleteTodo = (todoId) => {
    const todoData = { userId, todoId };

    dispatch(deleteTodo(todoData));
  };

  const handleUpdateClick = (todoId, todoName) => {
    setEditId(todoId);
    setEditValue(todoName);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="my-10 sm:my-14">
      <div className="my-8 text-center">
        <span className="font-title text-5xl">Your Today&apos;s Task</span>
      </div>

      {error && <p>Something went wrong!, please try again.</p>}

      <div className="flex items-center justify-center">
        <div className="my-4 flex w-full flex-col-reverse items-center justify-between sm:flex-row lg:w-[80%]">
          <div className="my-1 flex w-full rounded-full sm:mb-0 sm:w-[48%] lg:w-[40%]">
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

          <div className="my-4 w-full sm:my-0 sm:w-[48%] lg:w-[40%]">
            <ProgressBar
              label={"Progress"}
              currentValue={checkedCount}
              maxValue={todos.length}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ul className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-white shadow-[0px_0px_14px_6px_#ffffff1f] transition-all lg:w-[80%]">
          <li className="grid w-full grid-flow-row gap-4 rounded-t-xl border-b-2 border-white bg-[#cce4f1]">
            <div className="grid grid-cols-5 sm:grid-cols-8">
              <div className="flex items-center justify-center p-2 font-bold sm:col-span-1">
                Status
              </div>
              <div className="col-span-2 flex items-center justify-start border-x-2 border-white p-2 px-4 font-bold sm:col-span-5">
                Task
              </div>
              <div className="flex items-center justify-center border-r-2 border-white p-2 font-bold sm:col-span-1">
                Edit
              </div>
              <div className="flex items-center justify-center p-2 font-bold sm:col-span-1">
                Delete
              </div>
            </div>
          </li>

          {todos.length ? (
            todos.map((todo, index) => (
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
                        checked={todo.checked ?? false}
                        onChange={() => handleCheckboxChanges(todo._id, todo)}
                      />
                    )}
                  </div>

                  <div className="col-span-2 flex items-center justify-start border-x-2 border-white px-4 py-2 transition-all sm:col-span-5">
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
                          todo.checked ? "text-gray-500" : ""
                        }`}
                      >
                        {todo.title}
                        <span
                          className={`absolute bottom-[45%] left-0 h-[2px] w-full bg-black transition-transform duration-500 ${
                            todo.checked
                              ? "scale-x-100 bg-gray-500"
                              : "scale-x-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center border-r-2 border-white p-2 sm:col-span-1">
                    {editId === todo._id ? (
                      <button
                        className="transition-all hover:scale-110 hover:opacity-75 active:scale-95"
                        onClick={() => handleUpdateTodo(todo._id, editValue)}
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
                        onClick={() => handleUpdateClick(todo._id, todo.title)}
                      >
                        <img src={Edit} alt="Edit" width={25} height={25} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-center p-2 sm:col-span-1">
                    {editId === todo._id ? (
                      <button
                        className="transition-all hover:scale-110 hover:opacity-75 active:scale-95"
                        onClick={handleCancelEdit}
                      >
                        <img src={Cancel} alt="Cancel" width={25} height={25} />
                      </button>
                    ) : (
                      <button
                        className="text-red-500 transition-all hover:scale-110 hover:text-red-400 active:scale-95"
                        onClick={() => handleDeleteTodo(todo._id)}
                      >
                        <img src={Delete} alt="Delete" width={25} height={25} />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="w-full rounded-b-xl bg-white/50 text-center backdrop-blur-md">
              <div className="rounded-b-xl p-4 text-center">No Task Added</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
