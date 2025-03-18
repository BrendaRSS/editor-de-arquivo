import { userSchema } from "../../src/schemas/users-schemas";
import { faker } from "@faker-js/faker";

interface User {
    nome?: string;
    email?: string;
    idade?: number;
  }

describe("UserSchema", () => {
  const generateValidUser = (): User => ({
        nome: faker.lorem.word(),
        email: faker.internet.email(),
        idade: faker.number.int(),
  });

  describe("when body is not valid", () => {
    it("should return error if email is not present", () => {
      const user = generateValidUser();
      delete user.email;

      const { error } = userSchema.validate(user);

      expect(error).toBeDefined();
    });

    it("should return error if nome is not present", () => {
      const user = generateValidUser();
      delete user.nome;

      const { error } = userSchema.validate(user);

      expect(error).toBeDefined();
    });

    it("should return error if idade is not present", () => {
      const user = generateValidUser();
      delete user.idade;

      const { error } = userSchema.validate(user);

      expect(error).toBeDefined();
    });

    it("should return error if email is not a valid email format", () => {
      const user = generateValidUser();
      user.email = faker.lorem.word();

      const { error } = userSchema.validate(user);

      expect(error).toBeDefined();
    })

    it("should return error if idade is negative", () => {
      const user = generateValidUser();
      user.idade = -25;

      const { error } = userSchema.validate(user);

      expect(error).toBeDefined();
    })
    
    
  });

})