import { Router } from "express";
import { validateUser } from "../middlewares/validation-body";
import { usersPost, getUsers, getUserById } from "../controllers/users-controllers";

const usersRouter = Router();

usersRouter.post("/", validateUser, usersPost);
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
// usersRouter.put("/:id", updateUser);
// usersRouter.delete("/:id", deleteUser);

export { usersRouter };