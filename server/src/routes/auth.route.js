import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.post("/reauth", AuthController.reAuth);

export default authRouter;
