import Cart from "../models/cartModel.js";
import Category from "../models/categoryModel.js";
import Panel from "../models/panelModel.js";
import Payment from "../models/paymentInforModel.js";
import Product from "../models/productModel.js";
import Promotion from "../models/promotionModel.js";
import Size from "../models/sizeModel.js";
import User from "../models/useModel.js";

import { findOne } from "../utils/baseService.js";
import { errorsSendMessage } from "../utils/successResponse.js";

export const getCart = async (userId, res) => {
  try {
    const cart = await findOne(Cart, { user: userId });

    if (!cart) {
      throw errorsSendMessage(404, "Cart is not found", res);
    }

    return cart;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const getUser = async (userId, res) => {
  try {
    const user = await findOne(User, { _id: userId });

    if (!user) {
      throw errorsSendMessage(404, "User is not found", res);
    }

    return user;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const getProduct = async (productId, res) => {
  try {
    const product = await findOne(Product, { _id: productId }, null, {
      path: "idCategory",
      populate: {
        path: "event.eventId",
      },
    });

    if (!product) {
      errorsSendMessage(404, "Product is not found", res);
    }

    return product;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const getPanel = async (panelId, res) => {
  try {
    const panel = await findOne(Panel, { _id: panelId });

    if (!panel) {
      throw errorsSendMessage(400, "Panel is not found", res);
    }

    return panel;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const listPictures = (params, res) => {
  const pictures = params?.map((val) => {
    return val.path;
  });

  if (pictures?.length <= 0) {
    return errorsSendMessage(500, "No file", res);
  }
  return pictures;
};
