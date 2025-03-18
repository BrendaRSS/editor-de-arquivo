import userRepository from "../../repositories/user-repository";
import { UserType } from "../../types";
import { duplicatedEmailError, userDoesNotExist } from "./error";

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

async function getUserById(id: number) {
    const user = await userRepository.getUserById(id);
    if(!user) {
      throw userDoesNotExist();
    }
    return user;
    
}

const userService = {
    createUser,
    getAllUsers,
    getUserById,
  };  

export * from "./error";
export default userService;