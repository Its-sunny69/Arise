import RoomTodo from "../../models/roomTodoModel.js";

const getTodo = async (req, res) => {
  try {
    const { adminId } = req.params;
    console.log("adminIdaa", req.params);

    const todoData = await RoomTodo.find({ adminId });

    return res.status(201).send({
      msg: "RoomTodos data fetched succuessfully",
      data: todoData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { adminId, title, checked } = req.body;

    const userTodos = await RoomTodo.findOne({ adminId });

    console.log("userTodos", userTodos);

    if (!userTodos) {
      const todoCreated = await RoomTodo.create({
        adminId,
        todos: [{ title, checked }],
      });

      return res.status(201).send({
        msg: "New TodoList created and Todo added in Room",
        data: todoCreated,
      });
    } else {
      userTodos.todos.push({
        title,
        checked,
      });

      const updatedTodos = await userTodos.save();

      return res.status(201).send({
        msg: "Todo is added in Room",
        data: updatedTodos,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { adminId, todoId, title, checked } = req.body;

    const userTodos = await RoomTodo.findOne({ adminId });
    if (!userTodos) {
      return res.status(404).send({ msg: "User not found" });
    }

    const todoItem = userTodos.todos.id(todoId);
    if (!todoItem) {
      return res.status(404).send({ msg: "Todo item not found" });
    }

    if (title !== undefined) todoItem.title = title;
    if (checked !== undefined) todoItem.checked = checked;

    await userTodos.save();

    return res.status(200).send({
      msg: "Todo Updated Successfully in Room",
      data: todoItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const checkBoxUpdate = async (req, res) => {
  try {
    const { adminId, todoId, checkedById } = req.body;

    const userTodos = await RoomTodo.findOne({ adminId });
    if (!userTodos) {
      return res.status(404).send({ msg: "User not found" });
    }

    const todoItem = userTodos.todos.id(todoId);
    if (!todoItem) {
      return res.status(404).send({ msg: "Todo item not found" });
    }

    const checkedIndex = todoItem.checked.indexOf(checkedById);
    if (checkedIndex === -1) {
      // If not present, add `checkedById`
      todoItem.checked.push(checkedById);
    } else {
      // If present, remove `checkedById`
      todoItem.checked.splice(checkedIndex, 1);
    }

    // Save the updated document
    await userTodos.save();

    return res.status(200).send({
      msg: "Checked status updated successfully in Room",
      data: todoItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { adminId, todoId } = req.body;

    const userTodos = await RoomTodo.findOne({ adminId });

    if (!userTodos) {
      return res.status(404).send({ msg: "User not found" });
    }

    const todoItem = userTodos.todos.id(todoId);
    if (!todoItem) {
      return res.status(404).send({ msg: "Todo item not found" });
    }

    userTodos.todos.pull({ _id: todoId });
    await userTodos.save();

    return res.status(200).send({
      msg: "Todo deleted Successfully in Room",
      data: todoId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const roomTodoControllers = { getTodo, createTodo, updateTodo, checkBoxUpdate, deleteTodo };

export default roomTodoControllers;
