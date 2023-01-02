import asyncMiddleware from "../middleware/asyncMiddleware.js";
import Payment from "../models/paymentInforModel.js";
import { create, findOne, getAll } from "../utils/baseService.js";
import {
  errorsSendMessage,
  successSendData,
  successSendMessage,
} from "../utils/successResponse.js";
import User from "../models/useModel.js";
import Product from "../models/productModel.js";
import { getUser, getProduct } from "../helper/api.js";
import Promotion from "../models/promotionModel.js";
import * as BaseService from '../utils/baseService.js';


export const createPayment = asyncMiddleware(async (req, res) => {
  const { userId, totalMoney, totalShip, listProduct, address, discountCode, note, paymentMethods } =
    req.body;

  await getUser(userId, res);

  if (discountCode) {
    const isExistPromotionCode = await findOne(Promotion, {
      code: discountCode,
      status: true,
      startDate: { $lt: new Date().toISOString() },
      endDate: { $gt: new Date().toISOString() },
      amount: { $gt: 0 },
    });
    if (!isExistPromotionCode) {
      return errorsSendMessage(
        400,
        "Promotion code is expired or not exist",
        res
      );
    }
  }
  const payment = await create(Payment, {
    userId,
    totalMoney,
    totalShip,
    listProduct,
    address,
    discountCode,
    note,
    paymentMethods
  });

  if (payment) {
    for (const cartItem of listProduct) {
      const id = cartItem.productId;
      const qty = cartItem.quantity;
      const check = await Product.findOne({
        _id: id,
        quantity: { $gte: qty },
      });
      if (!check) {
        return errorsSendMessage(
          400,
          `Product id ${id} is not exist or not enough quantity`,
          res
        );
      }
      await Product.findOneAndUpdate({ _id: id }, { $inc: { quantity: -1 } });
    }

    const promo = await Promotion.findOne({
      discountCode,
      amount: { $gte: 0 },
    });

    if (!promo) {
      return errorsSendMessage(
        400,
        `Product id ${id} is not exist or not enough quantity`,
        res
      );
    }

    await Promotion.findOneAndUpdate({ discountCode }, { $inc: { amount: -1 } });
  }
  return successSendData(201, payment, res);
});

export const getAllPayment = asyncMiddleware(async (req, res) => {
  const payment = await getAll(Payment);

  if (!payment) {
    throw errorsSendMessage(404, "No payment", res);
  }

  const newPayment = await Promise.all(
    payment.map(async (item) => {
      const list = await listPro(item.listProduct, res);
      item.listProduct = list;
      return {
        ...item._doc,
      };
    })
  );

  return successSendData(200, newPayment, res);
});

export const getPaymentById = asyncMiddleware(async (req, res) => {
  const { paymentId } = req.params;

  const payment = await findOne(Payment, { _id: paymentId });

  if (!payment) {
    throw errorsSendMessage(404, "Payment is not found", res);
  }

  const list = await listPro(payment.listProduct, res);
  payment.listProduct = list;

  return successSendData(200, payment, res);
});

export const getPaymentByUserId = asyncMiddleware(async (req, res) => {
  const { userId } = req.params;

  const payment = await Payment.find({ userId });

  if (!payment) {
    throw errorsSendMessage(404, "Payment is not found", res);
  }

  const newPayment = await Promise.all(
    payment.map(async (item) => {
      const list = await listPro(item.listProduct, res);
      item.listProduct = list;
      return {
        ...item._doc,
      };
    })
  );

  return successSendData(200, newPayment, res);
});

export const updatePayment = asyncMiddleware(async (req, res) => {
  const { paymentId } = req.params;
  const { status, userId } = req.body;
  await getUser(userId, res);
  const payment = await Payment.findOneAndUpdate(
    { _id: paymentId, userId, status: "await" },
    { ...req.body },
    { new: true }
  );
  if (!payment) {
    return errorsSendMessage(404, `No payment has id ${paymentId}`, res);
  }
  if (status === "cancel") {
    for (const cartItem of payment.listProduct) {
      const id = cartItem.productId;
      const qty = cartItem.quantity;
      await Product.findOneAndUpdate({ _id: id }, { $inc: { quantity: +qty } });
    }
  }
  return successSendData(200, payment, res);
});

export const deletePaymentById = asyncMiddleware(async (req, res) => {
  const { paymentId } = req.params;
  const payment = await BaseService.findOneAndDelete(Payment, {
    _id: paymentId
  });
  if (!payment) {
    return errorsSendMessage(404, `No payment has id ${paymentId}`, res);
  }
  return successSendData(200, 'Delete payment Successfully', res);
});


//funtion
const listPro = async (listProduct, res) => {
  try {
    const list = await Promise.all(
      listProduct.map(async (item) => {
        const product = await getProduct(item.productId, res);
        product.quantity = item.quantity;
        return {
          product,
          productSelectColor: item.productSelectColor
        };
      })
    );
    return list;
  } catch (error) {
    console.log(error);
  }
};
