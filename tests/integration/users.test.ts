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

describe("GET  users", () => {
    const validUser = {
        nome: faker.lorem.word(),
        email: faker.internet.email(),
        idade: faker.number.int(),
    };

    it("should return status 200 and users when service succeeds", async () => {
        await server.post("/users").send(validUser);
        const response = await server.get("/users");

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ 
                id: expect.any(Number),
                email: validUser.email,
                nome: validUser.nome,
                idade: validUser.idade})
            ]))
        })

    it("should return status 404 if id is invalid", async () => {
        await server.post("/users").send(validUser);
        const response = await server.get("/users/0");
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })

    it("should return status 200 and user when id is valid", async () => {
        const userCreate = await server.post("/users").send(validUser);
        const response = await server.get(`/users/${userCreate.body.id}`);
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.objectContaining({
            id: userCreate.body.id,
            email: validUser.email,
            nome: validUser.nome,
            idade: validUser.idade
        }))
    });
})
