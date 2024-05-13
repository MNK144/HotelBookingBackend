import { Router } from "express";
import validationMiddleware from "middlewares/validation.middleware";
import { ChangePasswordSchema, LoginSchema, RegisterSchema } from "./auth.validations";
import { userChangePassword, userLogin, userRegister } from "./auth.controllers";

const AuthRouter = Router();
const BASEPATH = "/auth";

AuthRouter.post(
  `${BASEPATH}/login`,
  validationMiddleware(LoginSchema),
  userLogin
);

AuthRouter.post(
  `${BASEPATH}/register`,
  validationMiddleware(RegisterSchema),
  userRegister
);

AuthRouter.post(
  `${BASEPATH}/change-password`,
  validationMiddleware(ChangePasswordSchema),
  userChangePassword
);


export default AuthRouter;