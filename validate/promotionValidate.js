import Joi from "joi";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postPromotion: Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    percent: Joi.number().required(),
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.boolean(),
    code: Joi.string().trim().required(),
    amount: Joi.number(),
  }),
  paramPromotion: Joi.object({
    promotionId: myJoiObjectId().required(),
  }),
};
export default schemas;
