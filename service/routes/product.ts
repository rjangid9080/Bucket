import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controller/productController";


export const product: Router = Router();

product.route("/add").post(addProduct);

product.route("/all").get(getAllProducts);

product
  .route("/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);
