import sequelize, { closeDb } from "../src/configs/database";

export async function cleanDb() {
    await sequelize.sync({ force: true });
}

export async function closeConnection() {
    await closeDb();
}