import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  changePassword,
  resetPassword,
  forgotPassword
} from "../controller/userController";

export const user: Router = Router();

user.route("/register").post(registerUser);

user.route("/login").post(loginUser);

user.route("/update-profile").put(updateProfile);

user.route("/logout").get(logoutUser);

user.route("/change-password").put(changePassword);

user.route("/forgot-password").post(forgotPassword);

user.route("/reset-password/:userId/:resetToken").put(resetPassword);