import { Router } from "express";
import { validateUser } from "../middlewares/validation-body";
import { usersPost, getUsers } from "../controllers/users-controllers";

const usersRouter = Router();

usersRouter.post("/", validateUser, usersPost);
usersRouter.get("/", getUsers)

export { usersRouter };