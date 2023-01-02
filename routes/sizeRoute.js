import express from 'express';
import {
  create,
  getAllSize,
  removeSizeById
} from '../controller/sizeController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import sizeValidate from '../validate/sizeValidate.js';
const router = express.Router();

router.post('/create', validateMiddleware(sizeValidate.postSize, 'body'), create);
router.get('/all', getAllSize);
router.delete(
  '/:sizeId',
  validateMiddleware(sizeValidate.paramSize, 'params'),
  removeSizeById
);

export default router;
