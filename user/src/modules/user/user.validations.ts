import Joi from "joi";
import { errorMessage } from "constants/validationError";

export const UpdateUserSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(50)
    .label('First Name')
    .messages({ ...errorMessage }),
  lastName: Joi.string()
    .required()
    .max(50)
    .label('Last Name')
    .messages({ ...errorMessage }),
  phoneNumber: Joi.string()
    .max(13)
    .required()
    .label("Phone Number")
    .messages({ ...errorMessage }),
  email: Joi.string()
    .email()
    .required()
    .max(100)
    .label("Email")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});