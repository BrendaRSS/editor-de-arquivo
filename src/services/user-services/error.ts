import { ApplicationError } from "../../types";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "This email already exists",
  };
}

export function userDoesNotExist(): ApplicationError {
  return {
    name: "UserDoesNotExist",
    message: "This user does not exist",
  };
}