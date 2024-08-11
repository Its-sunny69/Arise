// backend/server.js

import express from "express";
import cors from "cors";
import { connectToDatabase } from "../database/database.js";

const app = express();
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
