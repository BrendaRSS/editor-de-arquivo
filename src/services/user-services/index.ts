import userRepository from "../../repositories/user-repository";
import { UserType } from "../../types";
import { duplicatedEmailError } from "./error";

async function createUser(body: UserType) {
    await validateUniqueEmail(body.email);
    return userRepository.create(body);
}

async function validateUniqueEmail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw duplicatedEmailError();
    }
}

async function getAllUsers() {
    return userRepository.getAllUsers();
}

const userService = {
    createUser,
    getAllUsers,
  };  

export * from "./error";
export default userService;