import { Controller } from "types/types";
import { createUserService, getUserByEmailService } from "./auth.services";
import { generalResponse } from "helpers/common.helper";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE, ACCESS_TOKEN_SECRET } from "config/config";

export const userLogin: Controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);
    if (!user) {
      return generalResponse(res, null, "Invalid Credentials", false, true, 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return generalResponse(res, null, "Invalid Credentials", false, true, 400);
    }
    const accessToken = jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE, });
    const loginData = {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        isHotelOwner: user.isHotelOwner
      },
    };
    return generalResponse(res, loginData);
  } catch (error) {
    next(error);
  }
};

export const userRegister: Controller = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, isHotelOwner, email, password } = req.body;
    const isExistingUser = await getUserByEmailService(email);
    if (isExistingUser) {
      return generalResponse(res, null, "User Already Exist!!", false, true, 409);
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await createUserService({
      firstName,
      lastName,
      phoneNumber,
      isHotelOwner,
      email,
      password: passwordHash
    });
    if (newUser) {
      return generalResponse(res, null, "User created successfully");
    } else {
      return generalResponse(res, null, "Failed to create User", false);
    }
  } catch (error) {
    next(error);
  }
};

export const userChangePassword: Controller = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    if (newUser) {
      return generalResponse(res, null, "User created successfully");
    } else {
      return generalResponse(res, null, "Failed to create User", false);
    }
  } catch (error) {
    next(error);
  }
};
