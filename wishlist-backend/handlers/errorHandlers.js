const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

const validationError = (error) => {
  res.status(500).json(error);
}

module.exports = {
  catchErrors,
  validationError
}