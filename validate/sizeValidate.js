import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postSize: Joi.object({
    size: Joi.string().trim().required()
  }),
  paramSize: Joi.object({
    sizeId: myJoiObjectId().required()
  })
};
export default schemas;
