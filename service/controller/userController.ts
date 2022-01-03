import { Request, Response, NextFunction, RequestHandler } from "express";
import { userDB } from "../model/userModel";
import ErrorHandler from "../utils/errorhandler";
import asyncHandler from "../middleware/asyncHandler";
import { registerValidation, loginValidation } from "../validation/validation";
import bcrypt from "bcryptjs";
import sendToken from "../utils/jwtToken";
import hashedPassword from "../utils/hashedPassword";

export const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return next(new ErrorHandler("Cannot be empty", 400));
    }
    const { error } = await registerValidation.validate(req.body);
    if (!error) {
      const hashed = await hashedPassword(
        req.body.password,
        req.body.confirmPassword
      );
      const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashed.password,
        confirmPassword: hashed.confirmPassword,
      });
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
      const isPasswordCorrect: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordCorrect) {
        sendToken(user, 200, res);
      } else {
        return next(new ErrorHandler("Invalid Email or Password", 401));
      }
    } else {
      res.send(error.details[0].message);
    }
  }
);

export const updateUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
