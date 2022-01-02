import Joi from "joi";
import { bucketUser, bucketLoginUser } from "../model/userModel";

export const registerValidation: Joi.ObjectSchema<bucketUser> = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().min(10).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password"),
});

export const loginValidation: Joi.ObjectSchema<bucketLoginUser> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
