// // backend/server.js
// // update the structure of the todoList, maybe need to create a modal or something different, dont know :(

// import express from "express";
// import cors from "cors";
// import { connectToDatabase } from "../database/database.js";

// const port = process.env.PORT;
// import { createServer } from "http";
// import { Server } from "socket.io";
// const app = express();
// const server = createServer(app);
// app.use(cors());
// app.use(express.json());

// // Route to get todos
// app.get("/api/todos", async (req, res) => {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("arise");
//     const collection = db.collection("todoList");
//     const todos = await collection.find({}).toArray();
//     console.log("Fetched todos:", todos);
//     res.json(todos);
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch todos", error: error.message });
//   }
// });

// // // Route to create a new todo
// // app.post("/api/todos", async (req, res) => {

// //   try {
// //     const client = await connectToDatabase();
// //     const db = client.db("arise");
// //     const collection = db.collection("todoList");
// //     const newTodo = req.body; // Expecting the new todo in the request body
// //     const result = await collection.insertOne(newTodo);
// //     console.log(result);

// //     // Check if the insertion was acknowledged
// //     if (result.acknowledged) {
// //       // Optionally fetch the newly created todo
// //       const createdTodo = { ...newTodo, _id: result.insertedId }; // Combine newTodo with the insertedId
// //       res.status(201).json(createdTodo); // Send back the created todo
// //     }
// //   } catch (error) {
// //     console.error("Error creating todo:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Failed to create todo", error: error.message });
// //   }
// // });

// // //Route to update todo
// // app.put("/api/todos/:id", async (req, res) => {
// //   const { id } = req.params;
// //   const updatedTodo = req.body;

// //   try {
// //     const client = await connectToDatabase();
// //     const db = client.db("arise");
// //     const collection = db.collection("todoList");

// //     //Filter the todo id
// //     const filter = { _id: new ObjectId(id) };

// //     //Insert the documnet of no match found
// //     const options = { upsert: true };

// //     //Update the document
// //     const updateDoc = {
// //       $set: updatedTodo,
// //     };

// //     const result = await collection.updateOne(filter, updateDoc, options);
// //     console.log("Result", result);

// //     if (result.modifiedCount === 1) {
// //       // Fetch the updated todo from the database
// //       const updatedTodoFromDB = await collection.findOne(filter);
// //       return res
// //         .status(200)
// //         .json({ updatedTodoFromDB, message: "Todo Updated Successfully" });
// //     } else {
// //       return res.status(404).json({ message: "Todo not found" });
// //     }
// //   } catch (error) {
// //     console.error("Error updating todo:", error);
// //     return res
// //       .status(500)
// //       .json({ message: "Failed to update todo", error: error.message });
// //   }
// // });

// // // Route to delete a todo
// // app.delete("/api/todos/:id", async (req, res) => {
// //   const { id } = req.params; // Get the todo ID from the URL

// //   try {
// //     const client = await connectToDatabase();
// //     const db = client.db("arise");
// //     const collection = db.collection("todoList");

// //     // Delete the todo from the database
// //     const result = await collection.deleteOne({ _id: new ObjectId(id) });

// //     if (result.deletedCount === 1) {
// //       res.status(200).json({ message: "Todo deleted successfully" });
// //     } else {
// //       res.status(404).json({ message: "Todo not found" });
// //     }
// //   } catch (error) {
// //     console.error("Error deleting todo:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Failed to delete todo", error: error.message });
// //   }
// // });

// //Route to get room data

// app.get("/api/rooms/:roomId", async (req, res) => {
//   const { roomId } = req.params;

//   try {
//     const client = await connectToDatabase();
//     const db = client.db("arise");
//     const roomsCollection = db.collection("rooms");

//     const rooms = await roomsCollection.findOne({ roomId: roomId });

//     if (rooms) {
//       res.status(200).json(rooms);
//     } else {
//       res.status(404).json({ message: "room not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching room data:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch room data", error: error.message });
//   }
// });

// // Start the server
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// // const client = new MongoClient(process.env.MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// // client.connect(err => {
// //   if (err) {
// //     console.error('Failed to connect to MongoDB:', err);
// //     return;
// //   }
// //   console.log('Connected to MongoDB');
// // });

// app.get("/", (req, res) => {
//   res.send("Hii");
// });

// // Websocket server creation
// const io = new Server(server, {
//   cors: {
//     origin: " http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("create-room", async (user) => {
//     try {
//       const roomId = Math.random().toString(36).substring(2, 8);
//       const client = await connectToDatabase();
//       const db = client.db("arise");
//       const collection = db.collection("todoList");

//       if (result.modifiedCount === 1) {
//         return res.status(200).json({ message: "Todo updated successfully" });
//       } else {
//         socket.emit("join-msg", { error: "Room does not exist" });
//         console.log("room not found");
//       }
//     } catch (error) {
//       console.error("Error updating todo:", error);
//       return res
//         .status(500)
//         .json({ message: "Failed to update todo", error: error.message });
//     }
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
