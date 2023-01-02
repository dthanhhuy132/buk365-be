import express from 'express';
import {
  addToCart,
  getCartByUser,
  removeProduct
} from '../controller/cartController.js';
import verifyToken from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/:userId', verifyToken, getCartByUser);
router.put('/delete', verifyToken, removeProduct);

export default router;
