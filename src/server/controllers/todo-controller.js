import Todo from "../../models/todoModal.js";

const getTodo = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userIdaa", req.params);

    const todoData = await Todo.find({ userId });
    return res.status(200).json(todoData);
  } catch (error) {
    console.error(error);
  }
};

const createTodo = async (req, res) => {
  try {
    const { userId, title, checked } = req.body;

    const userTodos = await Todo.findOne({ userId });

    // console.log("userTodos", userTodos)

    if (!userTodos) {
      const todoCreated = await Todo.create({
        userId,
        todos: [{ title, checked }],
      });

      return res.status(201).send({
        msg: "New Todo created",
        data: todoCreated,
      });
    } else {
      userTodos.todos.push({
        title,
        checked,
      });

      const updatedTodos = await userTodos.save();

      return res.status(201).send({
        msg: "Todos is updated",
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
    const { userId, todoId, title, checked } = req.body;

    const userTodos = await Todo.findOne({ userId });
    if (!userTodos) {
      return res.status(404).send({ msg: "User not found" });
    }

    const todoItem = userTodos.todos.id(todoId);
    if (!todoItem) {
      return res.status(404).send({ msg: "Todo item not found" });
    }

    if (title !== undefined) todoItem.title = title;
    if (checked !== undefined) todoItem.checked = checked;

    const updatedTodos = await userTodos.save();

    return res.status(200).send({
      msg: "Todo Updated Successfully",
      data: updatedTodos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const todoControllers = { getTodo, createTodo, updateTodo };

export default todoControllers;
