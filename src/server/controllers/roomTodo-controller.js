import RoomTodo from "../../models/roomTodoModel.js";

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

const roomTodoControllers = { createTodo };

export default roomTodoControllers;
