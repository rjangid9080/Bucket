import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });
const Secret_Key: any = process.env.JWT_Secret_Key;
const Cookie_Expire: any = process.env.Cookie_Expire;

export const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign({ id: user._id, email: user.email }, Secret_Key);
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + Cookie_Expire * 24 * 60 * 60 * 1000),
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
      },
      token,
      message: "Logged In",
    });
};

export const verifyToken = (token: any) => {
  const data = jwt.verify(token, Secret_Key) as JwtPayload;
  return data;
};

interface JwtPayload {
  id: string;
  email: string;
}
