import express from "express";
import cors from "cors";
import connectDb from "../database/database.js";
import roomsCollection from "../models/roomModel.js";
const port = 3002;
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

connectDb()
  .then(() => {
    console.log("connected for rooms");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api/rooms/:createdBy", async (req, res) => {
  const { createdBy } = req.params;
  console.log(createdBy);
  try {
    const rooms = await roomsCollection.find({ createdBy: createdBy });

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

app.get("/api/rooms/join/:userJoined", async (req, res) => {
  const { userJoined } = req.params;

  try {
    const rooms = await roomsCollection.find({ users: { $in: [userJoined] } });

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

app.delete("/api/rooms/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const rooms = await roomsCollection.findOneAndDelete({ roomId: roomId });

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

app.get("/", (req, res) => {
  res.send("Hii");
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("create-room", async (val) => {
    const roomId = Math.random().toString(36).substring(2, 8);
    const rooms = new roomsCollection({
      roomId: roomId,
      createdAt: Date.now(),
      createdBy: val,
      users: [val],
    });
    try {
      const roomSaved = await rooms.save();
      if (roomSaved) {
        socket.join(roomId);
        // io.to(roomId).emit("room-update", roomSaved);
        socket.emit("msg", { user: val, id: roomId });

        console.log("roomSaved", roomSaved);
      }
    } catch (err) {
      console.log("Error while creating room", err);
    }
  });

  socket.on("join-room", async (user, id) => {
    try {
      const room = await roomsCollection.findOne({ roomId: id });
      console.log("Join-msg", room);
      if (room) {
        socket.join(id);
        const updatedRoom = await roomsCollection.findOneAndUpdate(
          {
            roomId: room.roomId,
          },
          {
            $push: { users: user },
          },
          {
            new: true,
          }
        );
        if (updatedRoom) {
          console.log("update", updatedRoom);
          io.to(updatedRoom.roomId).emit("room-update", updatedRoom);
          io.to(updatedRoom.roomId).emit("update-users", updatedRoom.users);
          io.to(id).emit("join-msg", { userName: user, roomId: id });
          io.to(updatedRoom.roomId).emit(
            "update-members",
            updatedRoom.users.length
          );
        }
      } else {
        socket.emit("join-msg", { error: "Room doesn't exist" });
      }
    } catch (err) {
      console.log("join-msg had an Error", err);
    }
  });

  //handle Messages

  socket.on("send-msg", async (msgData) => {
    const { roomId } = msgData;

    try {
      const room = await roomsCollection.findOne({ roomId });
      if (room) {
        const updatedMessage = await roomsCollection.findOneAndUpdate(
          {
            roomId: room.roomId,
          },
          {
            $push: { message: msgData },
          },
          {
            new: true,
          }
        );

        if (updatedMessage) {
          io.to(updatedMessage.roomId).emit(
            "updated-msg",
            updatedMessage.message
          );
        }
      }
    } catch (err) {
      console.log(err, "Error occured in message");
    }
  });

  //handle user who is rejoined or has refreshed the page

  socket.on("leave-room", async (user, id) => {
    try {
      const leaveUser = await roomsCollection.findOneAndUpdate(
        {
          roomId: id,
        },
        { $pull: { users: user } },
        {
          new: true,
        }
      );
      if (leaveUser) {
        io.to(id).emit("room-update", leaveUser);
        io.to(id).emit("leave-user", leaveUser.users, user, id);
        io.to(leaveUser.roomId).emit("update-members", leaveUser.users.length);
        socket.leave(id);
      }
    } catch (error) {
      console.log(error, "Error occured while leaving room");
    }
  });

  socket.on("delete-room", (roomId, user) => {
    socket.to(roomId).emit("delete", roomId, user);
  });

  socket.on("rejoin-room", async (user, roomId) => {
    const room = await roomsCollection.findOne({ roomId });
    if (room) {
      socket.join(roomId);
      io.to(roomId).emit("join-msg", { userName: user, roomId });
      io.to(roomId).emit("update-users", room.users);
      // io.to(roomId).emit("leave-user", room.users, user, roomId);
      // socket.to(roomId).emit("delete", room.roomId);
      io.to(roomId).emit("room-update", room);
      io.to(roomId).emit("updated-msg", room.message);
    }
  });

  socket.on("refresh", async (username) => {
    const room = await roomsCollection.find({ users: { $in: [username] } });
    if (room) {
      io.to(room.roomId).emit("leave-user", room.users, username, room.roomId);
      socket.to(room.roomId).emit("delete", room.roomId);
      // io.to(room.roomId).emit("update-members", room.users.length);
    }
  });
});
