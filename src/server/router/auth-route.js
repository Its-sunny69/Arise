import express from "express";
import authControllers from "../controllers/auth-controller.js";
import validation from "../middleware/validation-middleware.js";
import {signupSchema, LoginSchema } from "../validation/auth-validation.js";
import authMiddleware from "../middleware/auth-middleware.js"

const router = express.Router();

router.route("/").get(authControllers.home);
router.route("/register").post(validation(signupSchema), authControllers.register);
router.route("/login").post(validation(LoginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);

export default router;
