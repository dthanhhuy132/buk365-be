import Cart from '../models/cartModel.js';
import User from '../models/useModel.js';
import { findOne } from '../utils/baseService.js';
import {
  errorsSendMessage,
  successSendData,
  successSendMessage
} from '../utils/successResponse.js';
import asyncMiddleware from '../middleware/asyncMiddleware.js';

export const getAllUser = asyncMiddleware(async (req, res) => {
  const user = await User.find({});
  return successSendData(201, user, res);
});

export const getUserById = asyncMiddleware(async (req, res) => {
  const { userId } = req.params;

  const user = await findOne(User, { _id: userId });
  const cart = await findOne(Cart, { user: userId });

  if (!user) {
    throw errorsSendMessage(404, 'User is not found', res);
  }

  const resData = {
    user,
    cart
  };

  return successSendData(200, resData, res);
});
