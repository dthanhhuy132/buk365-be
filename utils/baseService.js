import mongoose from 'mongoose';

export const create = async (model, data) => {
  try {
    const item = new model(data);
    return item.save();
  } catch (error) {
    console.log(error.message);
  }
};

export const findOne = async (
  model,
  options,
  select = null,
  populate = null
) => {
  try {
    const item = await model.findOne(options, select).populate(populate);
    return item;
  } catch (error) {
    throw error;
  }
};

export const findOneAndUpdate = async (model, ...options) => {
  try {
    const item = await model.findOneAndUpdate(...options);
    return item;
  } catch (errors) {
    throw errors;
  }
};

export const getAll = async (
  model,
  condition = null,
  select = null,
  populate = null,
  page = null,
  perPage = null
) => {
  const item = model
    .find(condition, select)
    .populate(populate)
    .skip(page > 0 ? (page - 1) * perPage : 0)
    .limit(Number(perPage));
  return item;
};
export const findOneAndDelete = async (model, ...options) => {
  try {
    const item = await model.findOneAndDelete(...options);
    return item;
  } catch (errors) {
    throw errors;
  }
};
export const findByIdAndDelete = async (model, ...options) => {
  try {
    const item = await model.findByIdAndDelete(...options);
    return item;
  } catch (errors) {
    throw errors;
  }
};
export const getById = async (model, id, select = null, populate = null) => {
  try {
    const item = await model.findById(id, select).populate(populate);
    return item;
  } catch (errors) {
    throw errors;
  }
};

export const findByArrayId = async (model, arrId) => {
  try {
    const item = await model.find({ _id: { $in: arrId } });
    return item;
  } catch (errors) {
    throw errors;
  }
};
