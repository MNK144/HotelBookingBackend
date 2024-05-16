import User from "models/User";
import { CreateUserInterface } from "./auth.interface";

export async function getUserByEmailService(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export async function getAuthUserById(id: string) {
  const user = await User.findById(id);
  return user;
}

export async function createUserService(userData: CreateUserInterface) {
  const newUserData = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber,
    email: userData.email,
    password: userData.password,
  };
  const newUser = await User.create(newUserData);
  return newUser;
}

