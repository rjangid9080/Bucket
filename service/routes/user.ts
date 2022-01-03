import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from "../controller/userController";

export const user: Router = Router();

user.route("/register").post(registerUser);

user.route("/login").post(loginUser);

user.route("/update-user").put(updateUser);

user.route("/logout").get(logoutUser);