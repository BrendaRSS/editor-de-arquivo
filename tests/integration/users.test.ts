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
    it("should respond with status 422 when body is not given", async () => {

        const response = await server.post('/users');

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 422 when body is not valid", async () => {
        const invalidUser = {
            name: faker.lorem.word(),
            email: faker.lorem.word(),
            age: faker.lorem.word(),
        };

        const response = await server.post('/users').send(invalidUser);

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 409 when the email already exist", async () => {
        const validUser = {
            nome: faker.lorem.word(),
            email: faker.internet.email(),
            idade: faker.number.int(),
        };

        const validUserWithSameEmail = {
            nome: faker.lorem.word(),
            email: validUser.email,
            idade: faker.number.int(),
        };

        await server.post('/users').send(validUser);
        const response = await server.post('/users').send(validUserWithSameEmail);

        expect(response.status).toBe(httpStatus.CONFLICT);
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
});

describe("PUT users", () => {
    const validUser = {
        nome: faker.lorem.word(),
        email: faker.internet.email(),
        idade: faker.number.int(),
    };

    const validUserTwo = {
        nome: faker.lorem.word(),
        email: faker.internet.email(),
        idade: faker.number.int(),
    }


    it("should respond with status 422 when body is not given", async () => {
        const postResponse = await server.post("/users").send(validUser);

        const response = await server.put(`/users/${postResponse.body.id}`)

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 422 when body is not valid", async () => {
        const invalidUser = {
            name: faker.lorem.word(),
            email: faker.lorem.word(),
            age: faker.lorem.word(),
        };

        const postResponse = await server.post("/users").send(validUser);

        const response = await server.put(`/users/${postResponse.body.id}`).send(invalidUser);

        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it("should respond with status 409 when the email already exist", async () => {
        const postResponse = await server.post("/users").send(validUser);
        await server.post("/users").send(validUserTwo);
        const userWithSameEmail = {
            nome: faker.lorem.word(),
            email: validUserTwo.email,
            idade: faker.number.int(),
        }

        const response = await server.put(`/users/${postResponse.body.id}`).send(userWithSameEmail);

        expect(response.status).toBe(httpStatus.CONFLICT);
    });
    
    it("should return status 404 if id is invalid", async () => {
        await server.post("/users").send(validUser);
        const response = await server.put(`/users/0`).send(validUserTwo);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })

    it("should respond with status 200 when user update is successful", async () => {
        const postResponse = await server.post("/users").send(validUser);
        await server.post("/users").send(validUserTwo);
        const userUpdate = {
            nome: faker.lorem.word(),
            email: faker.internet.email(),
            idade: faker.number.int(),
        }

        const response = await server.put(`/users/${postResponse.body.id}`).send(userUpdate);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.objectContaining({
            id: postResponse.body.id,
            nome: userUpdate.nome,
            idade: userUpdate.idade,
            email: userUpdate.email
        }))
    });
})

describe("DELETE users", () => {
    const validUser = {
        nome: faker.lorem.word(),
        email: faker.internet.email(),
        idade: faker.number.int(),
    };

    it("should return status 404 if id is invalid", async () => {
        await server.post("/users").send(validUser);
        const response = await server.delete("/users/0");

        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })

    it("should return status 200 if id is valid", async () => {
        const responsePost = await server.post("/users").send(validUser);
        
        const response = await server.delete(`/users/${responsePost.body.id}`);

        expect(response.status).toBe(httpStatus.OK);
    })
})