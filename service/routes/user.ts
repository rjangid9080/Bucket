import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile
} from "../controller/userController";

export const user: Router = Router();

user.route("/register").post(registerUser);

user.route("/login").post(loginUser);

user.route("/update-profile").put(updateProfile);

user.route("/logout").get(logoutUser);