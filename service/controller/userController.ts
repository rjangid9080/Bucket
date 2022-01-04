import { Request, Response, NextFunction, RequestHandler } from "express";
import { userDB } from "../model/userModel";
import { token } from "../model/resetTokenModel";
import ErrorHandler from "../utils/errorhandler";
import asyncHandler from "../middleware/asyncHandler";
import { registerValidation, loginValidation } from "../validation/validation";
import bcrypt from "bcryptjs";
import { sendToken, verifyToken } from "../utils/jwt";
import hashedPassword from "../utils/hashedPassword";
import sendMail from "../utils/sendMail";
import crypto from "crypto";

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
    const user = await userDB.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      },
      { new: true }
    );
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

export const changePassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("Login First", 404));
    }
    const { id } = verifyToken(token);
    const hashed = await hashedPassword(
      req.body.password,
      req.body.confirmPassword
    );
    const user = await userDB.findByIdAndUpdate(
      id,
      {
        password: hashed.password,
        confirmPassword: hashed.confirmPassword,
      },
      { new: true }
    );
    res.send(user);
  }
);

export const forgotPassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userDB.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    let userToken = await token.findOne({ userId: user._id });
    if (!userToken) {
      userToken = await new token({
        userId: user._id,
        resetToken: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const resetPasswordUrl: string = `${req.protocol}://${req.get("host")}
    /user/reset-password/${user._id}/${userToken.resetToken}`;

    const message: string = `Your password reset link is :
    \n\n${resetPasswordUrl}\n\n 
    If you have requested for forgot password then ignore it.`;

    await sendMail({
      email: user.email,
      subject: "Password Recovery Mail",
      message,
    });
    res.status(200).json({
      message: `Password Recovery Mail sent to the 
        ${user.email} , Successfully.`,
    });
  }
);

export const resetPassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userDB.findById(req.params.userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    const resetToken = await token.findOne({
      userId: req.params.userId,
      resetToken: req.params.resetToken,
    });
    if (!resetToken) {
      return next(new ErrorHandler("Link Expired", 400));
    }
    const hashed = await hashedPassword(
      req.body.password,
      req.body.confirmPassword
    );
    await userDB.findByIdAndUpdate(
      req.params.userId,
      {
        password: hashed.password,
        confirmPassword: hashed.confirmPassword,
      },
      { new: true }
    );
    await resetToken.delete()
    res.status(200).json({
      message:"Password Reset Successfully"
    })
  }
);
