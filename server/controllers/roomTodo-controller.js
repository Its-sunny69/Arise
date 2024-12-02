import RoomTodo from "../models/roomTodoModel.js";
import User from "../models/userModal.js";

const getTodo = async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log("roomIdaa", req.params);

    const todoData = await RoomTodo.find({ roomId });

    console.log("back-roomData", todoData);
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
    const { roomId, title, checked } = req.body;

    const userTodos = await RoomTodo.findOne({ roomId });

    console.log("userTodos", userTodos);

    if (!userTodos) {
      const todoCreated = await RoomTodo.create({
        roomId,
        todos: [{ title, checked }],
        completed: [],
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
    const { roomId, todoId, title, checked } = req.body;

    const userTodos = await RoomTodo.findOne({ roomId });
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
    const { roomId, todoId, checkedById } = req.body;
    console.log("idaaa0", roomId);
    const userTodos = await RoomTodo.findOne({ roomId });
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
      data: { ...todoItem.toObject(), checkedById },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { roomId, todoId } = req.body;

    const userTodos = await RoomTodo.findOne({ roomId });

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

const completedUpdate = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    console.log("roomID completed", roomId, userId);
    const completed = await RoomTodo.findOne({ roomId });

    if (completed) {
      if (completed.completed.includes(userId)) {
        return res.status(200).send({
          msg: "Complete Updated Successfully",
          data: completed,
        });
      }
      const data = await RoomTodo.findOneAndUpdate(
        { roomId: roomId },
        { $push: { completed: userId } },
        { new: true }
      );
      const user = await User.findById(userId);
      if (user) {
        const updatedPoints = user.points + 10;
        await User.findOneAndUpdate(
          { _id: userId },
          { $set: { points: updatedPoints } }
        );
      }

      console.log("completed", data);
      return res.status(200).send({
        msg: "Complete Updated Successfully",
        data: data,
      });
    } else {
      return res.status(500).send({ msg: "Internal server error" });
    }
  } catch (error) {
    console.log("Error while updating completed");
  }
};

const roomTodoControllers = {
  getTodo,
  createTodo,
  updateTodo,
  checkBoxUpdate,
  deleteTodo,
  completedUpdate,
};

export default roomTodoControllers;
