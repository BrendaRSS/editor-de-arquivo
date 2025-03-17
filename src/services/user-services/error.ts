import { ApplicationError } from "../../types";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "This email already exists",
  };
}