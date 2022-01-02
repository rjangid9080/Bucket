import { Request, Response, NextFunction, RequestHandler } from "express";
import { productDB } from "../model/productModel";
import ErrorHandler from "../utils/errorhandler";
import asyncHandler from "../middleware/asyncHandler";

export const addProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return next(new ErrorHandler("Cannot be empty", 400));
    }
    const product = await productDB.create(req.body);
    res.status(201).send(product);
  }
);

export const getAllProducts: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await productDB.find();
    res.status(200).send(products);
  }
);

export const updateProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let product = await productDB.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 500));
    }
    product = await productDB.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(product);
  }
);

export const deleteProduct: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productDB.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 500));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  }
);

export const getProductDetails: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productDB.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 500));
    }
    res.status(200).json(product);
  }
);