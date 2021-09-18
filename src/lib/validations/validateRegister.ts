import { UserCreateInput } from "../../interfaces/user";

export function validateRegister({
  firstName,
  lastName,
  email,
  password,
}: UserCreateInput) {
  return firstName === "" || lastName === "" || email === "" || password === ""
    ? false
    : true;
}
