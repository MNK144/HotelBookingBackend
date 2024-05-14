import { Controller } from "types/types";
import { getUserById, updateUserService } from "./user.services";
import { generalResponse } from "helpers/common.helper";

export const getUser: Controller = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const userData = await getUserById(userId);
    return generalResponse(res, userData);
  } catch (error) {
    next(error);
  }
};

export const updateUser: Controller = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    const userId = req.headers["x-user-id"] as string;
    const updatedUser = await updateUserService({
      id: userId,
      firstName,
      lastName,
      phoneNumber,
      email,
    })
    return generalResponse(res, updatedUser, "User updated successfully");
  } catch (error) {
    next(error);
  }
}