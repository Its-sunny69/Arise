import mongoose from "mongoose";
import User from "./userModal.js";
const roomSchema = new mongoose.Schema({
  roomId: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  progress: { type: Map, of: Number, require: true },
  createdAt: String,
  message: Array,
});

const roomsCollection = mongoose.model("Room", roomSchema);

export default roomsCollection;
