import express from 'express';
import {
  CreateNewEvent,
  UpdateEventById,
  GetEventById,
  getAllEvent,
  cancelEventById,
  deleteEventById
} from '../controller/eventController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import eventValidate from '../validate/eventValidate.js';
import uploadFile from './../common/uploadFile.js';
import verifyToken from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import uploadCloud from '../middleware/uploadCloud.js';
const router = express.Router();

router.post(
  '/create',
  verifyToken,
  authorize('admin'),
  uploadCloud.array('images'),
  validateMiddleware(eventValidate.postEvent, 'body'),
  CreateNewEvent
);
router.put(
  '/:eventId',
  verifyToken,
  authorize('admin'),
  uploadCloud.array('images'),
  validateMiddleware(eventValidate.paramEvent, 'params'),
  UpdateEventById
);
router.get('/all', getAllEvent);
router.get(
  '/:eventId',
  validateMiddleware(eventValidate.paramEvent, 'params'),
  GetEventById
);
router.delete(
  '/:eventId',
  verifyToken,
  authorize('admin'),
  validateMiddleware(eventValidate.paramEvent, 'params'),
  cancelEventById
);

router.delete(
  '/delete/:eventId',
  verifyToken,
  authorize('admin'),
  deleteEventById
);
export default router;
