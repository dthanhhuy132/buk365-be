import express from 'express';
import {
  cancelPanelById,
  createPanel,
  deletePanel,
  getAllPanel,
  getPaneById,
  updatePanel
} from '../controller/panelController.js';
import uploadFile from './../common/uploadFile.js';
import panelValidate from '../validate/panelValidate.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import verifyToken from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import uploadCloud from '../middleware/uploadCloud.js';
const router = express.Router();

router.post(
  '/create',
  verifyToken,
  authorize('admin'),
  uploadCloud.array('pictures'),
  validateMiddleware(panelValidate.postPanel, 'body'),
  createPanel
);
router.get('/all', getAllPanel);
router.get('/:panelId', getPaneById);
router.put(
  '/:panelId',
  verifyToken,
  authorize('admin'),
  uploadCloud.array('pictures'),
  updatePanel
);

router.delete(
  '/delete/:panelId',
  verifyToken,
  authorize('admin'),
  deletePanel
)

export default router;
