import express from "express";
import authControllers from "../controllers/auth-controller.js";
import todoControllers from "../controllers/todo-controller.js";
import validation from "../middleware/validation-middleware.js";
import {signupSchema, LoginSchema } from "../validation/auth-validation.js";
import authMiddleware from "../middleware/auth-middleware.js"

const router = express.Router();

router.route("/").get(authControllers.home);
router.route("/register").post(validation(signupSchema), authControllers.register);
router.route("/login").post(validation(LoginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);
router.route("/todo/get/:userId").get(todoControllers.getTodo)
router.route("/todo/post").post(todoControllers.createTodo)
router.route("/todo/update").patch(todoControllers.updateTodo)

export default router;
