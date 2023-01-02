import express from "express";
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  searchProductByName,
  DeleteProductById,
  getAllProductGroupByName,
  deleteProductById,
  getProductByCategory,
} from "../controller/productController.js";
import uploadFile from "./../common/uploadFile.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import productValidate from "../validate/productValidate.js";
import verifyToken from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import uploadCloud from "../middleware/uploadCloud.js";
const router = express.Router();

router.post(
  "/create",
  // verifyToken,
  // authorize("admin"),
  uploadCloud.array("pictures"),
  validateMiddleware(productValidate.postProduct, "body"),
  createNewProduct
);
router.get("/all", getAllProducts);
router.get("/allByName", getAllProductGroupByName);
router.get("/search", searchProductByName);
router.get(
  "/:productId",
  validateMiddleware(productValidate.paramProduct, "params"),
  getProductById
);
router.get(
  "/category/:categoryId",
  validateMiddleware(productValidate.paramCate, "params"),
  getProductByCategory
);
router.delete(
  "/:productId",
  verifyToken,
  authorize("admin"),
  validateMiddleware(productValidate.paramProduct, "params"),
  DeleteProductById
);
router.put(
  "/:productId",
  verifyToken,
  authorize("admin"),
  uploadCloud.array("pictures"),
  validateMiddleware(productValidate.paramProduct, "params"),
  updateProductById
);

router.delete(
  "/delete/:productId",
  verifyToken,
  authorize("admin"),
  deleteProductById
);

export default router;
