import express from "express";
import authControllers from "../controllers/auth-controller.js";
import todoControllers from "../controllers/todo-controller.js";
import validation from "../middleware/validation-middleware.js";
import { signupSchema, LoginSchema } from "../validation/auth-validation.js";
import authMiddleware from "../middleware/auth-middleware.js";
import roomTodoControllers from "../controllers/roomTodo-controller.js";

const router = express.Router();

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validation(signupSchema), authControllers.register);
router.route("/login").post(validation(LoginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);

//todo
router.route("/todo/get/:userId").get(todoControllers.getTodo);
router.route("/todo/create").post(todoControllers.createTodo);
router.route("/todo/update").patch(todoControllers.updateTodo);
router.route("/todo/checkBoxUpdate").patch(todoControllers.checkBoxUpdate);
router.route("/todo/deleteTodo").delete(todoControllers.deleteTodo);

//roomTodo
router.route("/roomtodo/create").post(roomTodoControllers.createTodo);

export default router;
