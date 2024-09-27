// backend/server.js

import express from "express";
import cors from "cors";
import { connectToDatabase } from "../database/database.js";
import { ObjectId } from "mongodb";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Route to get todos
app.get("/api/todos", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db("arise");
    const collection = db.collection("todoList");
    const todos = await collection.find({}).toArray();
    console.log("Fetched todos:", todos);
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch todos", error: error.message });
  }
});

// Route to create a new todo
app.post("/api/todos", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db("arise");
    const collection = db.collection("todoList");
    const newTodo = req.body; // Expecting the new todo in the request body
    const result = await collection.insertOne(newTodo);
    console.log(result);

    // Check if the insertion was acknowledged
    if (result.acknowledged) {
      // Optionally fetch the newly created todo
      const createdTodo = { ...newTodo, _id: result.insertedId }; // Combine newTodo with the insertedId
      res.status(201).json(createdTodo); // Send back the created todo
    }
  } catch (error) {
    console.error("Error creating todo:", error);
    res
      .status(500)
      .json({ message: "Failed to create todo", error: error.message });
  }
});

//Route to update todo
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  try {
    const client = await connectToDatabase();
    const db = client.db("arise");
    const collection = db.collection("todoList");

    //Filter the todo id
    const filter = { _id: new ObjectId(id) };

    //Update the document
    const updateDoc = {
      $set: updatedTodo,
    };

    const result = await collection.updateOne(filter, updateDoc);
    console.log("Result", result);

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: "Todo updated successfully" });
    } else {
      return res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    return res
      .status(500)
      .json({ message: "Failed to update todo", error: error.message });
  }
});

//Route to get room data

app.get("/api/rooms/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const client = await connectToDatabase();
    const db = client.db("arise");
    const roomsCollection = db.collection("rooms");

    const rooms = await roomsCollection.findOne({ roomId: roomId });

    if (rooms) {
      res.status(200).json(rooms);
    } else {
      res.status(404).json({ message: "room not found" });
    }
  } catch (error) {
    console.error("Error fetching room data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch room data", error: error.message });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hii");
});

// Websocket server creation
const io = new Server(server, {
  cors: {
    origin: " http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("create-room", async (user) => {
    const roomId = Math.random().toString(36).substring(2, 8);
    const client = await connectToDatabase();
    const db = client.db("arise");
    const roomsCollection = db.collection("rooms");

    const roomData = {
      roomId: roomId,
      createdBy: user,
      users: [user],
      createdAt: new Date(),
    };

    await roomsCollection.insertOne(roomData);
    socket.join(roomId);

    let data = { user: user, id: roomId };
    socket.emit("msg", data);
    //updated state of the room
    io.to(roomId).emit("room-update", roomData);
  });

  socket.on("join-room", async (userName, roomId) => {
    const client = await connectToDatabase();
    const db = client.db("arise");
    const roomsCollection = db.collection("rooms");

    let room = await roomsCollection.findOneAndUpdate(
      { roomId: roomId },
      { $addToSet: { users: userName } },
      { returnDocument: "after" }
    );

    if (room) {
      socket.join(roomId);
      console.log(`${userName} joined room: ${roomId}`);
      io.to(roomId).emit("join-msg", { userName: userName, roomId: roomId });
      io.to(roomId).emit("update-users", room.users);
    } else {
      socket.emit("join-msg", { error: "Room does not exist" });
      console.log("room not found");
    }
  });

  socket.on("rejoin-room", async (userName, roomId) => {
    socket.join(roomId);
    const client = await connectToDatabase();
    const db = client.db("arise");
    const roomsCollection = db.collection("rooms");

    let room = await roomsCollection.findOne({ roomId: roomId });

    if (room) {
      // Emit the current room state to the rejoining user
      socket.emit("room-update", room);
    }
  });

  socket.on("message", async (msg, roomId) => {
    const client = await connectToDatabase();
    const db = client.db("arise");
    const messageCollection = db.collection("rooms");

    let room = await messageCollection.findOne({ roomId: roomId });

    if (room) {
      await messageCollection.updateOne(
        { roomId: roomId },

        { $push: { message: msg } }
      );
      room = await messageCollection.findOne({ roomId: roomId });
      io.to(roomId).emit("message-all", room.message);
    }
  });
});
