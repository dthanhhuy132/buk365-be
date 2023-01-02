import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postCategory: Joi.object({
    name: Joi.string().trim().required(),
    event: Joi.array().items(
      Joi.object({
        eventId: myJoiObjectId().required()
      })
    ),
    description: Joi.string().trim(),
  }),
  paramCategory: Joi.object({
    categoryId: myJoiObjectId().required()
  })
};
export default schemas;
