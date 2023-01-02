import express from 'express';

//funtion
import {
  registerUser,
  login,
  refreshToken,
  logout
} from '../controller/authController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import validateRegister from '../validate/authValidate.js';
import uploadCloud from '../middleware/uploadCloud.js';

const router = express.Router();

router.post(
  '/register',
  validateMiddleware(validateRegister.register, 'body'),
  registerUser
);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.delete("/logout", logout);

export default router;
