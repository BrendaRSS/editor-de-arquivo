import app, { init } from '../../src/app'
import supertest from 'supertest';
import { cleanDb, closeConnection } from '../helpers';
import { faker } from "@faker-js/faker";
import User from '../../src/models/User';
import httpStatus from "http-status";

beforeAll(async () => {
    await init();
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
});

afterAll(async () => {
    await closeConnection();
});

const server = supertest(app);

describe('POST /users', () => {
    it("should respond with status 400 when body is not given", async () => {

        const response = await server.post('/users');

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const invalidUser = {
            name: faker.lorem.word(),
            email: faker.lorem.word(),
            age: faker.lorem.word(),
        };

        const response = await server.post('/users').send(invalidUser);

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const invalidUser = {
            name: faker.lorem.word(),
            email: faker.lorem.word(),
            age: faker.lorem.word(),
        };

        const response = await server.post('/users').send(invalidUser);

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
        const validUser = {
            nome: faker.lorem.word(),
            email: faker.internet.email(),
            idade: faker.number.int(),
        };


        const response = await server.post("/users").send(validUser);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            email: validUser.email,
            nome: validUser.nome,
            idade: validUser.idade
          }));
      });
});
