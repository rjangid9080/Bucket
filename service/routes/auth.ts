import { Router } from "express";
import { registerUser , loginUser } from "../controller/authController";
import { registerValidation } from "../validation/validation";

export const auth: Router = Router();

auth.route('/register').post(registerUser);

auth.route('/login').post(loginUser);