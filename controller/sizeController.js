import Size from '../models/sizeModel.js';
import { successSendData } from '../utils/successResponse.js';
import * as BaseService from '../utils/baseService.js';
import asyncMiddleware from '../middleware/asyncMiddleware.js';

export const create = asyncMiddleware(async (req, res, next) => {
  const { size } = req.body;
  const newSize = await BaseService.create(Size, {
    size
  });
  return successSendData(201, newSize, res);
});
export const getAllSize = asyncMiddleware(async (req, res, next) => {
  const { page, perPage } = req.query;
  const sizes = await BaseService.getAll(Size, null, null, null, page, perPage);
  if (!sizes.length) {
    return errorsSendMessage(404, 'No sizes', res);
  }
  return successSendData(200, sizes, res);
});
export const removeSizeById = asyncMiddleware(async (req, res, next) => {
  const { sizeId } = req.params;
  const size = await BaseService.findOneAndDelete(Size, {
    _id: sizeId
  });
  if (!size) {
    return errorsSendMessage(404, `No size has id ${sizeId}`, res);
  }
  return successSendData(200, 'Delete Size Successfully', res);
});
