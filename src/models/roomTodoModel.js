import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
  title: { type: String, require: true },
  checked: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

const roomTodoSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  todos: { type: [todoListSchema], default: [] },
});

const RoomTodo = new mongoose.model("RoomTodo", roomTodoSchema);

export default RoomTodo;
