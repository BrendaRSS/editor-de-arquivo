import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users-router";
import sequelize from "./configs/database";

dotenv.config();

const app = express();
app
.use(express.json())
.use(cors())
.get("/health", (req: Request<any, any, any, any>, res: Response<any>) => res.send("Tudo ok!"))
.use("/users", usersRouter)

sequelize.sync()
    .then(() => console.log('Synchronized database'))
    .catch(err => console.error('Error synchronizing the database:', err));

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running in port ${port}`))

export default app;