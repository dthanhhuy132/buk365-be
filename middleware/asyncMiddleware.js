const asyncMiddleware = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (err) {
    console.log('asyncMiddleware', err);
    next();
  }
};

export default asyncMiddleware;
