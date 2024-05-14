import { Router } from "express";
import validationMiddleware from "middlewares/validation.middleware";
import { getUser, updateUser } from "./user.controllers";
import { UpdateUserSchema } from "./user.validations";

const UserRouter = Router();

UserRouter.post(
  `/get`,
  getUser
);

UserRouter.post(
  `/update`,
  validationMiddleware(UpdateUserSchema),
  updateUser
);

export default UserRouter;