import asyncMiddleWare from "../middleware/asyncMiddleware.js";
import {
  errorsSendMessage,
  successSendData,
  successSendMessage,
} from "../utils/successResponse.js";

import { getCart, getUser, getProduct } from "../helper/api.js";
import { findOne } from "../utils/baseService.js";
import Product from "../models/productModel.js";

export const addToCart = asyncMiddleWare(async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const user = await getUser(userId, res);
    const cart = await getCart(userId, res);
    const product = await getProduct(cartItems.productId, res);

    if (product.quantity === 0) {
      throw errorsSendMessage(400, "Product is not quantity", res);
    }

    if (product.quantity < cartItems.quantity) {
      throw errorsSendMessage(400, "amount < quantity", res);
    }

    const productIndex = cart.cartItems.findIndex((item) => {
      return item.productId.equals(cartItems.productId);
    });

    if (productIndex === -1) {
      // Create new product
      cart.cartItems.push({
        ...cartItems,
      });
    } else {
      //Update existing product
      cart.cartItems[productIndex].quantity += cartItems.quantity;
    }

    await cart.save();
    return successSendMessage(200, "Success", res);
  } catch (error) {}
});

export const getCartByUser = asyncMiddleWare(async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await getCart(userId, res);

    const listProduct = await listProInCart(cart.cartItems, res);

    const responese = {
      ...cart._doc,
      cartItems: [...listProduct],
    };

    return successSendData(200, responese, res);
  } catch (error) {}
});

export const removeProduct = asyncMiddleWare(async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await getProduct(productId, res);
    const cart = await getCart(userId, res);

    const productIndex = cart.cartItems.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (productIndex !== -1) {
      cart.cartItems.splice(productIndex, 1);
    }

    await cart.save();
    return successSendMessage(200, "Success remove", res);
  } catch (error) {}
});

//funtion
const listProInCart = async (listProduct, res) => {
  try {
    const list = await Promise.all(
      listProduct.map(async (item) => {
        const product = await getProduct(item.productId, res);
        product.quantity = item.quantity;
        return {
          product,
          productSelectColor: item.productSelectColor,
        };
      })
    );
    return list;
  } catch (error) {
    console.log(error);
  }
};
