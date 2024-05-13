import Joi from "joi";
import { errorMessage } from "constants/validationError";

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .max(100)
    .label("Email")
    .messages({ ...errorMessage }),
  password: Joi.string()
    .required()
    .min(8)
    .max(254)
    .label("Password")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});

export const RegisterSchema = Joi.object({
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
  isHotelOwner: Joi.boolean()
    .default(false)
    .label("Hotel Owner Flag")
    .messages({ ...errorMessage }),
  email: Joi.string()
    .email()
    .required()
    .max(100)
    .label("Email")
    .messages({ ...errorMessage }),
  password: Joi.string()
    .required()
    .min(8)
    .max(254)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .label("Password")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});

export const ChangePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .required()
    .min(8)
    .max(254)
    .label("Old Password")
    .messages({ ...errorMessage }),
  newPassword: Joi.string()
    .required()
    .min(8)
    .max(254)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .label("New Password")
    .messages({ ...errorMessage }),
}).options({
  abortEarly: false,
});