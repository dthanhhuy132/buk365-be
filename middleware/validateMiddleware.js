import {
  successSendData,
  errorsSendMessage
} from '../utils/successResponse.js';

const validateMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      console.log('error', error);
      return errorsSendMessage(400, error.details[0].message, res);
    }
    next();
  };
};
export default validateMiddleware;
