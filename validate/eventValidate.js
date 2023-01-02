import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(Joi);

const schemas = {
  postEvent: Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    percent: Joi.number().required(),
    title: Joi.string().trim().required(),
    typeEvent: Joi.string().trim().required(),
    description: Joi.string().trim().required()
  }),
  paramEvent: Joi.object({
    eventId: myJoiObjectId().required()
  })
};
export default schemas;
