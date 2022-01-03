import { Request, Response, NextFunction, RequestHandler } from "express";
import { userDB } from "../model/userModel";
import ErrorHandler from "../utils/errorhandler";
import asyncHandler from "../middleware/asyncHandler";
import { registerValidation, loginValidation } from "../validation/validation";
import bcrypt from "bcryptjs";
import { sendToken, verifyToken } from "../utils/jwtToken";
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

export const updateProfile: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Login First", 404));
    }
    const { id } = verifyToken(token);
    const user = await userDB.findByIdAndUpdate(id,req.body,{new:true})
    res.send(user);
    
  }
);

export const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .status(200)
      .send("Logged out");
  }
);
