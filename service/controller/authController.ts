import { Request, Response, NextFunction, RequestHandler } from "express";
import { userDB } from "../model/userModel";
import ErrorHandler from "../utils/errorhandler";
import asyncHandler from "../middleware/asyncHandler";
import { registerValidation, loginValidation } from "../validation/validation";

export const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return next(new ErrorHandler("Cannot be empty", 400));
    }
    const user = new userDB({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const { error } = await registerValidation.validate(req.body);
    if (!error) {
      const newUser = await user.save();
      res.send(newUser);
    } else {
      res.send(error.details[0].message);
    }
  }
);

export const loginUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return next(new ErrorHandler("Cannot be empty", 400));
    }
    const { error } = await loginValidation.validate(req.body);
    if (!error) {
      const user = await userDB.findOne({
        email: req.body.email,
      });
      if (!user) {
        return next(new ErrorHandler("Email doesn't exist", 404));
      }
      if (req.body.password !== user.password) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
      }
    } else {
      res.send(error.details[0].message);
    }
  }
);
