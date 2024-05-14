import User from "models/User";
import { UpdateUserInterface } from "./user.interface";

export async function getUserById(id: string) {
  const user = await User.findById(id, '-password -__v');
  return user;
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
    new: true,
    projection: '-password -__v'
  });
  return updatedUser;
}