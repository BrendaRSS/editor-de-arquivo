import { Router } from "express";
import { validateUser } from "../middlewares/validation-body";
import { usersPost, getUsers, getUserById, updateUser, deleteUser } from "../controllers/users-controllers";

const usersRouter = Router();

usersRouter.post("/", validateUser, usersPost);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", validateUser, updateUser);
usersRouter.delete("/:id", deleteUser);

export { usersRouter };