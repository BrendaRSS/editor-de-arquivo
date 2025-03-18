import { Sequelize } from 'sequelize';
import loadEnvs from './envs';

loadEnvs();
const isTest = process.env.NODE_ENV === 'test' 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: isTest ? ':memory:' : './database.sqlite',
    logging: process.env.NODE_ENV === 'test' ? false : console.log
});

export async function initDb(): Promise<void> {
    await sequelize.sync({ force: process.env.NODE_ENV === 'test' });
}

export async function closeDb(): Promise<void> {
    await sequelize.close();
}

export default sequelize;