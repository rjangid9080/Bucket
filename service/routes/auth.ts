import { Router } from "express";
import { registerUser , loginUser } from "../controller/authController";

export const auth: Router = Router();

auth.route('/register').post(registerUser);

auth.route('/login').post(loginUser);