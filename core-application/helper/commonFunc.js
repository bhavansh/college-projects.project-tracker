const { validationResult } = require("express-validator");

exports.getErrors = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let errorsObject = {};
    errors.array().forEach((error) => {
      errorsObject[error.param] = error.msg;
    });
    return errorsObject;
  }
};
