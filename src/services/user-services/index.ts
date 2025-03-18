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

async function upateUser(id: number, body: UserType) {
  await getUserById(id);
  await validateUniqueEmail(body.email);
  const update = await userRepository.updateUser(id, body);

  return getUserById(id);
}

async function deleteUser(id: number) {
  await getUserById(id);
  return userRepository.deleteUser(id);
}

const userService = {
    createUser,
    getAllUsers,
    getUserById,
    upateUser,
    deleteUser
  };  

export * from "./error";
export default userService;