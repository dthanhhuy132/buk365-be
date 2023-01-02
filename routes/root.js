import express from "express";
import product from "./productRoute.js";
import user from "./userRouter.js";
import auth from "./authRoute.js";
import category from "./categoryRoute.js";
import size from "./sizeRoute.js";
import panel from "./panelRoute.js";
import event from "./eventRoute.js";
import cart from "./cartRoute.js";
import payment from "./paymentRoute.js";
import promotion from "./promotionRoute.js";
const router = express.Router();

router.use("/product", product);
router.use("/user", user);
router.use("/auth", auth);
router.use("/category", category);
router.use("/size", size);
router.use("/panel", panel);
router.use("/event", event);
router.use("/cart", cart);
router.use("/payment", payment);
router.use("/promotion", promotion);

export default router;
