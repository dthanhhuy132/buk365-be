import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postProduct: Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    size: Joi.string().trim(),
    description: Joi.string().required(),
    idCategory: myJoiObjectId().required(),
    colorList: Joi.array().items(Joi.string().required()),
    productType: Joi.string().trim(),
  }),
  paramProduct: Joi.object({
    productId: myJoiObjectId().required(),
  }),
  paramCate: Joi.object({
    categoryId: myJoiObjectId().required(),
  }),
};
export default schemas;
