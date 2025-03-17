import { Request, Response, NextFunction } from "express";
import { userSchema } from "../schemas/users-schemas";
import httpStatus from "http-status";

export async function validateUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const { error } = userSchema.validate(body, { abortEarly: false });

    if(error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors)
    }

    res.locals.body = body;
    next()
}
