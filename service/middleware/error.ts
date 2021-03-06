import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorhandler";

export default (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  if (err.name == "CastError") {
    err = new ErrorHandler(`Not found`, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
