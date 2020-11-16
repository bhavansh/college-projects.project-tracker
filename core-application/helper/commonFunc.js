const { validationResult } = require("express-validator");

exports.getErrors = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorArray = errors.array().map((error) => ({
      [error.param]: error.msg,
    }));
    return errorArray;
  }
};
