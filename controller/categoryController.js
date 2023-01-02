import Category from "../models/categoryModel.js";
import {
  errorsSendMessage,
  successSendData,
} from "../utils/successResponse.js";
import * as BaseService from "../utils/baseService.js";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import Event from "../models/eventModel.js";
import { listPictures } from "../helper/api.js";
const checkAddEvent = async (event, res) => {
  //Check event not exist
};
const checkDuplicateElement = (arr) => {
  const s = new Set(arr);
  if (arr.length !== s.size) {
    return true;
  }
  return false;
};

export const createCategory = asyncMiddleware(async (req, res, next) => {
  let { name, event, description } = req.body;
  try {
    const checkCategory = await BaseService.findOne(Category, { name });
    if (checkCategory) {
      return errorsSendMessage(400, `Category ${name} is exist`, res);
    }
    if (!event) {
      event = [];
    }
    let temp = event.map((value) => value.eventId);
    const eventIdArr = new Set(temp);
    const checkEvent = await BaseService.findByArrayId(Event, Array.from(temp));

    if (eventIdArr.size !== checkEvent.length) {
      return errorsSendMessage(404, `Event is not exist`, res);
    }
    let result = checkDuplicateElement(temp);
    if (result) {
      return errorsSendMessage(400, "Duplicate event is list category", res);
    }
    //Check event is expired
    const checkEventTemp = await BaseService.getAll(Event, {
      _id: {
        $in: Array.from(temp),
      },
      status: true,
      endDate: { $lt: new Date().toISOString() },
    });
    if (eventIdArr.size !== checkEventTemp.length) {
      return errorsSendMessage(404, `Event is expired or disabled`, res);
    }

    const pictures = listPictures(req.files, res);

    const newCategory = await BaseService.create(Category, {
      name,
      event,
      description,
      categoryImage: pictures,
    });
    return successSendData(201, newCategory, res);
  } catch (error) {}
});

export const getCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const category = await BaseService.findOne(
      Category,
      { _id: categoryId },
      null,
      "event.eventId"
    );
    if (!category) {
      throw errorsSendMessage(404, `No category has id ${categoryId}`, res);
    }
    return successSendData(200, category, res);
  } catch (error) {}
});

export const getAllCategories = asyncMiddleware(async (req, res, next) => {
  const { page, perPage } = req.query;
  try {
    const categories = await BaseService.getAll(
      Category,
      null,
      null,
      "event.eventId",
      page,
      perPage
    );
    if (!categories.length) {
      return errorsSendMessage(404, "No categories", res);
    }
    return successSendData(200, categories, res);
  } catch (error) {}
});

export const updateCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  let { name, event, description } = req.body;
  if (!categoryId.trim()) {
    throw errorsSendMessage(400, "CategoryId is empty", res);
  }
  if (!event) {
    event = [];
  }
  let temp = event.map((value) => value.eventId);
  const eventIdArr = new Set(temp);
  const checkEvent = await BaseService.findByArrayId(Event, Array.from(temp));

  if (eventIdArr.size !== checkEvent.length) {
    return errorsSendMessage(404, `Event is not exist`, res);
  }
  let result = checkDuplicateElement(temp);
  if (result) {
    return errorsSendMessage(400, "Duplicate category is list event", res);
  }

  //Check event is expired
  const checkEventTemp = await BaseService.getAll(Event, {
    _id: {
      $in: Array.from(temp),
    },
    status: true,
    endDate: { $lt: new Date().toISOString() },
  });
  if (eventIdArr.size !== checkEventTemp.length) {
    return errorsSendMessage(404, `Event is expired or disabled`, res);
  }

  const pictures = listPictures(req.files, res);

  const updatedCategory = await BaseService.findOneAndUpdate(
    Category,
    { _id: categoryId },
    { name, event, description, categoryImage: pictures },
    { new: true }
  );
  if (!updatedCategory) {
    throw errorsSendMessage(404, `No category has id ${categoryId}`, res);
  }
  return successSendData(200, updatedCategory, res);
});

export const deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const category = await BaseService.findOneAndDelete(Category, {
      _id: categoryId,
    });
    if (!category) {
      return errorsSendMessage(404, `No category has id ${categoryId}`, res);
    }
    return successSendData(200, "Delete category Successfully", res);
  } catch (error) {}
});
