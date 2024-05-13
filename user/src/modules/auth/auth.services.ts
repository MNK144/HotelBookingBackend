import User from "models/User";
import { CreateUserInterface, UpdateUserInterface } from "./auth.interface";

export async function getUserByEmailService(email: string) {
  const user = await User.findOne({ email });
  return user;
}

export async function getUserById(id: string) {
  const user = await User.findById(id);
  return user;
}

export async function createUserService(userData: CreateUserInterface) {
  const newUserData = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber,
    isHotelOwner: userData.isHotelOwner,
    email: userData.email,
    password: userData.password,
  };
  const newUser = await User.create(newUserData);
  return newUser;
}

export async function updateUserService(userData: UpdateUserInterface) {
  const updatedUser = await User.findByIdAndUpdate(userData.id,{
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber,
    isHotelOwner: userData.isHotelOwner,
    email: userData.email,
    password: userData.password,
  }, {
    new: true
  });
  return updatedUser;
}