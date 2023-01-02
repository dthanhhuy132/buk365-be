import Promotion from "../models/promotionModel.js";
import Category from "../models/categoryModel.js";
import {
  successSendData,
  successSendMessage,
  errorsSendMessage,
} from "../utils/successResponse.js";
import asyncMiddleware from "./../middleware/asyncMiddleware.js";
import * as BaseService from "../utils/baseService.js";
export const CreateNewPromotion = asyncMiddleware(async (req, res, next) => {
  const {
    title,
    description,
    startDate,
    endDate,
    percent,
    status,
    code,
    amount,
  } = req.body;

  const createdPromotion = await BaseService.create(Promotion, {
    title,
    description,
    startDate,
    endDate,
    percent,
    status,
    code,
    amount,
  });
  return successSendData(201, createdPromotion, res);
});

export const UpdatePromotionById = asyncMiddleware(async (req, res, next) => {
  const {
    title,
    description,
    startDate,
    endDate,
    percent,
    status,
    code,
    amount,
  } = req.body;
  const { promotionId } = req.params;

  const updatedPromotion = await BaseService.findOneAndUpdate(
    Promotion,
    { _id: promotionId },
    {
      title,
      description,
      startDate,
      endDate,
      percent,
      status,
      code,
      amount,
    },
    { new: true }
  );
  if (!updatedPromotion) {
    throw errorsSendMessage(404, `No event has id ${promotionId}`, res);
  }
  return successSendData(200, updatedPromotion, res);
});
export const GetPromotionById = asyncMiddleware(async (req, res, next) => {
  const { promotionId } = req.params;
  const promotion = await BaseService.findOne(Promotion, { _id: promotionId });
  if (!promotion) {
    throw errorsSendMessage(404, `No Promotion has id ${promotionId}`, res);
  }
  return successSendData(200, promotion, res);
});

export const getAllPromotion = asyncMiddleware(async (req, res, next) => {
  const { page, perPage } = req.query;
  const promotions = await BaseService.getAll(
    Promotion,
    null,
    null,
    null,
    page,
    perPage
  );
  if (!promotions.length) {
    return errorsSendMessage(404, "No promotions", res);
  }
  return successSendData(200, promotions, res);
});
export const cancelPromotionById = asyncMiddleware(async (req, res, next) => {
  const { promotionId } = req.params;
  const promotionCancel = await BaseService.findOneAndUpdate(
    Promotion,
    {
      _id: promotionId,
      status: true,
    },
    { status: false }
  );
  if (!promotionCancel) {
    return errorsSendMessage(404, `No promotion has id ${promotionId}`, res);
  }
  return successSendData(
    200,
    `Promotion id ${promotionId} canceled successfully`,
    res
  );
});
export const getPromotionByCode = asyncMiddleware(async (req, res, next) => {
  const { code } = req.params;
  const promotion = await BaseService.findOne(Promotion, { code });
  if (!promotion) {
    return errorsSendMessage(404, `Promotion code ${code} is not exist`, res);
  }
  return successSendData(200, promotion, res);
});

export const deletePromotionById = asyncMiddleware(async (req, res) => {
  const { promoId } = req.params;
  const promo = await BaseService.findOneAndDelete(Promotion, {
    _id: promoId
  });
  if (!promo) {
    return errorsSendMessage(404, `No promo has id ${promoId}`, res);
  }
  return successSendData(200, 'Delete promo Successfully', res);
});