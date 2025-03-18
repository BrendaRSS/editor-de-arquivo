import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/user-services";

export async function usersPost(req: Request, res: Response) {
    const { nome, idade, email } = res.locals.body;

    try {
        const user = await userService.createUser({ nome, idade, email });
        res.status(httpStatus.CREATED).json(user);
    } catch(error) {
        const err = error as Error;
        if (err.name === 'DuplicatedEmailError') {
            return res.status(httpStatus.CONFLICT).send((err.message ) || 'This email already exists');
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

export async function getUserById( req: Request, res: Response ) {
    const id = req.params.id;

    try {
        const user = await userService.getUserById(Number(id));
        return res.status(httpStatus.OK).json(user);
    } catch(error) {
        const err = error as Error;
        if (err.name === 'UserDoesNotExist') {
            return res.status(httpStatus.NOT_FOUND).send(err.message || 'This user does not exist');
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function updateUser( req: Request, res: Response ) {
    const id = req.params.id;
    const body = res.locals.body;

    try {
        const updateUser = await userService.upateUser(Number(id), body);
        return res.status(httpStatus.OK).json(updateUser)
    } catch(error) {
        const err = error as Error;
        if (err.name === 'DuplicatedEmailError') {
            return res.status(httpStatus.CONFLICT).send((err.message ) || 'This email already exists');
        }
        if (err.name === 'UserDoesNotExist') {
            return res.status(httpStatus.NOT_FOUND).send(err.message || 'This user does not exist');
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function deleteUser( req: Request, res: Response ) {
    const id = req.params.id;

    try {
        await userService.deleteUser(Number(id));
        return res.status(httpStatus.OK).send('User deleted')
    } catch(error) {
        const err = error as Error;
        if (err.name === 'UserDoesNotExist') {
            return res.status(httpStatus.NOT_FOUND).send(err.message || 'This user does not exist');
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}