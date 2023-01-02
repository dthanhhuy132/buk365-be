import jwt from "jsonwebtoken";
import { create } from "../utils/baseService.js";
import User from "../models/useModel.js";
import {
  errorsSendMessage,
  successSendData,
  successSendMessage,
} from "../utils/successResponse.js";
import { findOne, findOneAndUpdate } from "../utils/baseService.js";
import Cart from "../models/cartModel.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import { getUser, listPictures } from "../helper/api.js";

const dataUser = {
  fullName: null,
  userImage: null,
  refreshToken: null,
  address1: null,
  address2: null,
  address3: null,
};

const dataCart = {
  user: null,
  cartItems: [],
};

export const registerUser = asyncMiddleware(async (req, res) => {
  const { email, password, userNumber, role } = req.body;
  const isExistEmail = await findOne(User, { email });
  const isExistNumber = await findOne(User, { userNumber });

  if (isExistEmail || isExistNumber) {
    throw successSendMessage(400, "User is exist", res);
  }

  const newUser = await create(User, {
    ...dataUser,
    email,
    password,
    userNumber,
    role: role ? role : "customer",
  });

  const newCart = await create(Cart, {
    ...dataCart,
    user: newUser._id,
  });

  const dataResponse = {
    user: newUser,
    cart: newCart,
  };

  return successSendData(201, dataResponse, res);
});

export const login = asyncMiddleware(async (req, res) => {
  const { email, password, userNumber } = req.body;
  const isExistEmail = await findOne(User, { email });
  const isExistPhone = await findOne(User, { userNumber });

  if (email) {
    if (!isExistEmail) {
      throw successSendMessage(404, "User is not found", res);
    }
    const isMatchPassword = await User.comparePassword(
      password,
      isExistEmail.password
    );

    if (!isMatchPassword) {
      throw successSendMessage(200, "Password is incorrect", res);
    }

    const payload = generateTokens(isExistEmail);

    const data = {
      user: {
        ...isExistEmail._doc,
      },
      ...payload,
    };

    return successSendData(200, data, res);
  }

  if (userNumber) {
    if (!isExistPhone) {
      throw successSendMessage(404, "Phone is not found", res);
    }

    const isMatchPassword = await User.comparePassword(
      password,
      isExistPhone.password
    );

    if (!isMatchPassword) {
      throw successSendMessage(404, "Password is incorrect", res);
    }

    const payload = generateTokens(isExistPhone);

    const data = {
      user: {
        ...isExistPhone._doc,
      },
      ...payload,
    };

    return successSendData(200, data, res);
  }
});

export const refreshToken = asyncMiddleware(async (req, res) => {
  const { refreshToken, idUser } = req.body;

  const isVerifyToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

  if (!isVerifyToken) {
    throw errorsSendMessage(401, "Unauthorized", res);
  }

  const user = await getUser(idUser);

  if (user && user.refreshToken !== refreshToken) {
    throw errorsSendMessage(403, "Token is incorrect", res);
  }

  const payload = generateTokens(user);

  return successSendData(200, payload, res);
});

export const logout = asyncMiddleware(async (req, res) => {
  const { idUser } = req.body;
  await getUser(idUser);

  await User.findOneAndUpdate({ _id: idUser }, { refreshToken: null });

  return res.sendStatus(204);
});

const generateTokens = (data) => {
  data.refreshToken = null;
  const accessToken = jwt.sign({ data }, process.env.ACCESS_TOKEN, {
    expiresIn: "5d",
  });

  // const refreshToken = jwt.sign({ data }, process.env.REFRESH_TOKEN, {
  //   expiresIn: '1d'
  // });

  return { accessToken };
};
