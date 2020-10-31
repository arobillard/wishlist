const expVal = require('express-validator');

exports.runValidation = async (req, res, controller) => {
  const errs = expVal.validationResult(req);
  if (errs.errors.length) {
    res.json({ errs: errs.errors})
  } else {
    try {
      await controller();
    } catch (err) {
      res.status(500).json(err.errors)
    }
  }
}