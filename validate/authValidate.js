import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(Joi);

const validateEmail = Joi.string()
  .trim()
  .required()
  .pattern(RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'));

const validatePassword = Joi.string()
  .trim()
  .pattern(RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(6)
  .max(30);

const validatePhone = Joi.string()
  .trim()
  .min(6)
  .max(30);

const schemas = {
  register: Joi.object({
    email: validateEmail,
    password: validatePassword,
    userNumber: validatePhone,
    role: Joi.string().trim()
  }),
};

export default schemas;
