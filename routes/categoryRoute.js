import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../controller/categoryController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import categoryValidate from "../validate/categoryValidate.js";
import verifyToken from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import uploadCloud from "../middleware/uploadCloud.js";
const router = express.Router();

router.post(
  "/create",
  verifyToken,
  authorize("admin"),
  uploadCloud.array("categoryImage"),
  validateMiddleware(categoryValidate.postCategory, "body"),
  createCategory
);
router.get("/all", getAllCategories);
router.get(
  "/:categoryId",
  validateMiddleware(categoryValidate.paramCategory, "params"),
  getCategoryById
);
router.put(
  "/:categoryId",
  verifyToken,
  authorize("admin"),
  uploadCloud.array("categoryImage"),
  validateMiddleware(categoryValidate.paramCategory, "params"),
  updateCategoryById
);

router.delete(
  "/delete/:categoryId",
  verifyToken,
  authorize("admin"),
  deleteCategoryById
);
export default router;
