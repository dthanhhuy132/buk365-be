import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import {
  successSendData,
  successSendMessage,
  errorsSendMessage,
} from "../utils/successResponse.js";
import asyncMiddleware from "./../middleware/asyncMiddleware.js";
import * as BaseService from "../utils/baseService.js";
import { listPictures } from "../helper/api.js";

export const createNewProduct = asyncMiddleware(async (req, res, next) => {
  const {
    idCategory,
    name,
    description,
    quantity,
    size,
    price,
    colorList,
    productType,
  } = req.body;
  const checkCategory = await BaseService.getById(Category, idCategory);
  if (!checkCategory) {
    return errorsSendMessage(404, "This category is not exist", res);
  }
  if (req.files.length <= 0) {
    return errorsSendMessage(500, "No file", res);
  }
  const checkIsExistProduct = await BaseService.findOne(Product, {
    name,
    size,
    status: true,
  });
  if (checkIsExistProduct) {
    return errorsSendMessage(400, `Product ${name} size ${size} is exist`, res);
  }

  const pictures = listPictures(req.files, res);
  const createdProduct = await BaseService.create(Product, {
    idCategory,
    name,
    description,
    quantity,
    size,
    pictures,
    price,
    colorList: colorList,
    productType,
  });
  return successSendData(201, createdProduct, res);
});

export const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const { page, perPage } = req.query;
  const products = await BaseService.getAll(
    Product,
    { status: true },
    null,
    {
      path: "idCategory",
      populate: {
        path: "event.eventId",
      },
    },
    page,
    perPage
  );

  if (!products.length) {
    return errorsSendMessage(404, "No products", res);
  }
  return successSendData(200, products, res);
});
export const getAllProductGroupByName = asyncMiddleware(
  async (req, res, next) => {
    const product = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "idCategory",
          foreignField: "_id",
          as: "category-detail",
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "category-detail.event.eventId",
          foreignField: "_id",
          as: "event-detail",
        },
      },
      {
        $group: {
          _id: {
            name: "$name",
          },
          units: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          data: "$units",
        },
      },
    ]);
    return successSendData(200, product, res);
  }
);
export const getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const product = await BaseService.getById(Product, productId, null, {
    path: "idCategory",
    populate: {
      path: "event.eventId",
    },
  });
  if (!product) {
    return errorsSendMessage(404, `No product has id ${productId}`, res);
  }
  return successSendData(200, product, res);
});

export const updateProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const pictures = listPictures(req.files, res);
  const updatedProduct = await BaseService.findOneAndUpdate(
    Product,
    { _id: productId },
    { ...req.body, pictures },
    { new: true }
  );
  if (!updatedProduct) {
    return errorsSendMessage(404, `No product has id ${productId}`, res);
  }
  return successSendData(200, updatedProduct, res);
});
export const searchProductByName = asyncMiddleware(async (req, res, next) => {
  const { keyName } = req.query;
  const productArr = await BaseService.getAll(Product, null, "name");
  const searchedProduct = productArr.filter((value) => {
    return value.name.toLowerCase().search(keyName.trim().toLowerCase()) !== -1;
  });
  if (searchedProduct.length === 0) {
    return errorsSendMessage(404, `No products`, res);
  }
  return successSendData(200, searchedProduct, res);
});
export const DeleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;

  const updatedProduct = await BaseService.findOneAndUpdate(
    Product,
    { _id: productId, status: true },
    { status: false },
    { new: true }
  );
  if (!updatedProduct) {
    return errorsSendMessage(404, `No product has id ${productId}`, res);
  }
  return successSendData(200, updatedProduct, res);
});

export const deleteProductById = asyncMiddleware(async (req, res) => {
  const { productId } = req.params;
  const product = await BaseService.findOneAndDelete(Product, {
    _id: productId,
  });
  if (!product) {
    return errorsSendMessage(404, `No product has id ${productId}`, res);
  }
  return successSendData(200, "Delete product Successfully", res);
});

export const getProductByCategory = asyncMiddleware(async (req, res) => {
  const { categoryId } = req.params;
  const products = await BaseService.getAll(Product, {
    idCategory: categoryId,
    status: true,
  });
  if (products.length < 1) {
    return errorsSendMessage(
      404,
      `No products has category id ${categoryId}`,
      res
    );
  }
  return successSendData(200, products, res);
});
