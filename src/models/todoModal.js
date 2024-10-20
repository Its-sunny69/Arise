import mongoose from "mongoose";

//TodoListSchema
const todoListSchema = new mongoose.Schema({
  title: { type: String, require: true },
  checked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

//TodoSchema
const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  todos: { type: [todoListSchema], default: [] },
});

//creating model
const Todo = new mongoose.model("Todo", todoSchema);

export default Todo;
