import express from "express";
import {
  CreateNewPromotion,
  UpdatePromotionById,
  GetPromotionById,
  getAllPromotion,
  cancelPromotionById,
  getPromotionByCode,
  deletePromotionById,
} from "../controller/promotionController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import promotionValidate from "../validate/promotionValidate.js";
import verifyToken from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  authorize("admin"),
  validateMiddleware(promotionValidate.postPromotion, "body"),
  CreateNewPromotion
);
router.put(
  "/:promotionId",
  verifyToken,
  authorize("admin"),
  validateMiddleware(promotionValidate.paramPromotion, "params"),
  UpdatePromotionById
);
router.get("/all", getAllPromotion);
router.get("/code/:code", getPromotionByCode);
router.get(
  "/:promotionId",
  validateMiddleware(promotionValidate.paramPromotion, "params"),
  GetPromotionById
);
router.delete(
  "/:promotionId",
  verifyToken,
  authorize("admin"),
  validateMiddleware(promotionValidate.paramPromotion, "params"),
  cancelPromotionById
);

router.delete(
  "/delete/:promoId",
  verifyToken,
  authorize("admin"),
  deletePromotionById
);
export default router;
