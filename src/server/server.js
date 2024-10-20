import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import router from "./router/auth-route.js";
import connectDb from "../database/database.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

const port = 5000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});
