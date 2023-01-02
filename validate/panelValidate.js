import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postPanel: Joi.object({
    categoryId: myJoiObjectId(),
    description: Joi.string().trim().required()
  })
};

export default schemas;
