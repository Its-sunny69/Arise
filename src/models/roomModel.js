import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: String,
  createdBy: String,
  users: Array,
  createdAt: String,
  message: Array,
});

const roomsCollection = mongoose.model("Room", roomSchema, "rooms");

export default roomsCollection;
