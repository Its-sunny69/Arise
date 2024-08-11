import { useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState({ id: "", newTask: "" });
  const [edit, setEdit] = useState(false);
  const handleTask = (e) => {
    setTask({ ...task, newTask: e.target.value });
    console.log(task);
  };

  const addTask = () => {
    setTodo([...todo, { id: Date.now(), newTask: task.newTask }]);
    setTask({ id: "", newTask: "" });
  };

  const handleDelete = (id) => {
    let deleteTask = todo.filter((item) => item.id !== id);
    setTodo(deleteTask);
  };

  const handleEdit = (id) => {
    let taskEdit = todo.find((item) => item.id === id);
    setTask({ id: taskEdit.id, newTask: taskEdit.newTask });
    setEdit(true);
  };

  const updateTask = () => {
    setTodo(
      todo.map((item) =>
        item.id == task.id ? { ...item, newTask: task.newTask } : item
      )
    );
    setTask({ id: "", newTask: "" });
    setEdit(false);
  };
  return (
    <>
      <input
        type="text"
        name="newTask"
        onChange={handleTask}
        value={task.newTask}
      />
      <button onClick={edit ? updateTask : addTask}>
        {edit ? "Update" : "Add"}
      </button>

      <ul>
        {todo.map((item) => (
          <li key={item.id}>
            {item.newTask}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
