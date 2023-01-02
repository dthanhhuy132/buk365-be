import express from "express";
import {
  createPayment,
  deletePaymentById,
  getAllPayment,
  getPaymentById,
  getPaymentByUserId,
  updatePayment,
} from "../controller/paymentController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import paymentValidate from "../validate/paymentValidate.js";
import verifyToken from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  validateMiddleware(paymentValidate.postPayment, "body"),
  createPayment
);
router.get("/getAll", verifyToken, authorize("admin"), getAllPayment);
router.get("/:paymentId", verifyToken, getPaymentById);
router.get("/user/:userId", verifyToken, getPaymentByUserId);
router.put("/:paymentId", verifyToken, updatePayment);
router.delete(
  "/delete/:paymentId",
  verifyToken,
  authorize("admin"),
  deletePaymentById
);

export default router;
