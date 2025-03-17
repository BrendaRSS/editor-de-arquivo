import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/user-services";

export async function usersPost(req: Request, res: Response) {
    const { nome, idade, email } = res.locals.body;

    try {
        const user = await userService.createUser({ nome, idade, email });
        res.status(httpStatus.CREATED).json(user);
    } catch(error) {
        if (error instanceof Error && (error as any).name === 'DuplicatedEmailError') {
            return res.status(httpStatus.CONFLICT).send((error as any).message || 'O e-mail já está em uso');
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        return res.status(httpStatus.OK).json(users)
    } catch(error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}