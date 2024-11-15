import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: String,
  createdBy: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: String,
  message: Array,
});

const roomsCollection = mongoose.model("Room", roomSchema);

export default roomsCollection;
