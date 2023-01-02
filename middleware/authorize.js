import {
  errorsSendMessage,
  successSendMessage
} from '../utils/successResponse.js';

const authorize =
  (...roles) =>
  (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      throw errorsSendMessage(401, 'Unauthorized', res);
    }

    if (!roles.includes(req.user.role)) {
      throw errorsSendMessage(
        403,
        "Don't have permission to access this user",
        res
      );
    }
    next();
  };
export default authorize;
