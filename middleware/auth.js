import jwt from 'jsonwebtoken';
import User from '../models/useModel.js';
import { findOne } from '../utils/baseService.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = payload.data;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export default verifyToken;
