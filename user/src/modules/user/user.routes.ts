import { Router } from "express";
import validationMiddleware from "middlewares/validation.middleware";

const UserRouter = Router();

UserRouter.post(
  `/get`,
  validationMiddleware(GetUserSchema),
  getUser
);

UserRouter.post(
  `/update`,
  validationMiddleware(UpdateUserSchema),
  updateUser
);

export default UserRouter;