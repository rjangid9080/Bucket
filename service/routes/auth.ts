import { Router, Request, Response } from "express";
import { userDB } from "../model/userModel";
import { registerValidation, loginValidation } from "../validation/validation";

export const auth: Router = Router();

auth.post("/register", async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).send({ message: "Cannot be empty" });
    } else {
      const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      try {
        const { error } = await registerValidation.validate(req.body);
        if (!error) {
          const newUser = await user.save();
          res.send(newUser);
        } else {
          res.send(error.details[0].message);
        }
      } catch (error: any) {
        res.status(500).send({
          message: error.message || `Error occured while creating user`,
        });
      }
    }
});

auth.post("/login", async (req: Request, res: Response) => {
  try {
    const { error } = await loginValidation.validate(req.body);
    if (!error) {
      const user = await userDB.findOne({
        email: req.body.email,
      });
      if (user) {
        res.send({ message: "user found" });
      } else {
        res.send({ message: `email doesn't exist` });
      }
    }
    else{
      res.send(error.details[0].message )
    }
  } catch (error: any) {
    res.send(error);
  }
});
