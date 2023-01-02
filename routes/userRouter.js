import express from 'express';
import { getAllUser, getUserById } from '../controller/userController.js';
import verifyToken from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/admin/getAllUser', verifyToken, authorize('admin'), getAllUser);
router.get('/:userId', getUserById);

export default router;
