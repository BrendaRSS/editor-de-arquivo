import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users-router";
import sequelize, { initDb } from "./configs/database";

dotenv.config();

const app = express();
app
.use(express.json())
.use(cors())
.get("/health", (req: Request<any, any, any, any>, res: Response<any>) => res.send("Tudo ok!"))
.use("/users", usersRouter)

export async function init(): Promise<express.Express> {
    await initDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await sequelize.close();
}

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    init().then(() => {
        app.listen(port, () => console.log(`Server running in port ${port}`));
    });
}

export default app;