import express from "express";
import cors from "cors";
import connectDb from "./database/database.js";
import roomsCollection from "./models/roomModel.js";
import RoomTodo from "./models/roomTodoModel.js";
import User from "./models/userModal.js";
import router from "./router/routes.js";
const port = 3002;
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/todos", router);

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
  
  try {
    const rooms = await roomsCollection
      .find({ createdBy: createdBy })
      .populate("users");

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
    const rooms = await roomsCollection
      .find({ users: { $in: [userJoined] } })
      .populate("users");

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
      progress: { [val]: 0 },
    });
    try {
      const roomSaved = await rooms.save();
      if (roomSaved) {
        socket.join(roomId);

        const populatedRoom = await roomsCollection
          .findOne({ roomId })
          .populate("users");

        if (populatedRoom) {
          socket.emit("room-update", roomSaved);
        }

        socket.emit("msg", { user: val, id: roomId });
      }
    } catch (err) {
      console.log("Error while creating room", err);
    }
  });

  socket.on("join-room", async (user, id) => {
    try {
      const room = await roomsCollection.findOne({ roomId: id });

      if (room) {
        if (room.users.includes(user)) {
          socket.emit("join-msg", { error: "User already exist in room" });
          return;
        }
        socket.join(id);
        await roomsCollection.findOneAndUpdate(
          {
            roomId: room.roomId,
          },
          {
            $push: { users: user },
            $set: { [`progress.${user}`]: 0 },
          }
        );

        const updatedRoom = await roomsCollection
          .findOne({ roomId: room.roomId })
          .populate("users");

        if (updatedRoom) {
          console.log("update", updatedRoom);
          io.to(updatedRoom.roomId).emit("room-update", updatedRoom);

          io.to(updatedRoom.roomId).emit("update-users", updatedRoom.users);
          io.to(id).emit("join-msg", { userName: user, roomId: id });
          io.to(updatedRoom.roomId).emit(
            "update-members",
            updatedRoom.users.length,
            updatedRoom.roomId
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
            updatedMessage.message,
            roomId
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
      const leaveUser = await roomsCollection
        .findOneAndUpdate(
          {
            roomId: id,
          },
          {
            $pull: { users: user },

            $unset: { [`progress.${user}`]: 0 },
          },
          {
            new: true,
          }
        )
        .populate("users");

      if (leaveUser) {
        io.to(id).emit("room-update", leaveUser);
        io.to(id).emit("leave-user", leaveUser.users, user, id);
        io.to(leaveUser.roomId).emit(
          "update-members",
          leaveUser.users.length,
          leaveUser.roomId
        );

        socket.leave(id);
      }
    } catch (error) {
      console.log(error, "Error occured while leaving room");
    }
  });

  socket.on("delete-room", async (roomId, user, userId) => {
    socket.to(roomId).emit("delete", roomId, user);
    await RoomTodo.findOneAndDelete({ roomId: roomId });
  });

  socket.on("rejoin-room", async (user, roomId) => {
    const room = await roomsCollection.findOne({ roomId }).populate("users");
    if (room) {
      socket.join(roomId);
      io.to(room.roomId).emit("join-msg", { userName: user, roomId });
      io.to(room.roomId).emit("update-users", room.users, roomId);
      io.to(room.roomId).emit("room-update", room, roomId);
      io.to(room.roomId).emit("updated-msg", room.message, roomId);
    }
  });

  socket.on("refresh", async (username) => {
    const room = await roomsCollection.find({ users: { $in: [username] } });

    if (room) {
      io.to(room.roomId).emit("leave-user", room.users, username, room.roomId);
      socket.to(room.roomId).emit("delete", room.roomId);
      io.to(room.roomId).emit("update-members", room?.users?.length);
    }
  });

  socket.on("todo", (todos, roomId) => {
    io.to(roomId).emit("addTodo", todos, roomId);
  });

  socket.on("updateCheckbox", (updatedTodo, roomId) => {
    io.to(roomId).emit("updateTodo", updatedTodo, roomId);
  });

  socket.on("progress", async (userId, count, roomId, todoLength) => {
    try {
      if (userId) {
        const progress = await roomsCollection.findOneAndUpdate(
          { roomId: roomId },
          { $set: { [`progress.${userId}`]: count } },
          {
            new: true,
          }
        );
        if (progress) {
          io.to(roomId).emit(
            "room-progress",
            progress.progress,
            roomId,
            todoLength
          );
        }
      }
    } catch (error) {
      console.log("Error while updating progress", error);
    }
  });

  socket.on("points", async () => {
    const userwithPoints = await User.find({ points: { $exists: true } });

    if (userwithPoints) {
      io.emit("pointsSocket", userwithPoints);
    }
  });
});
