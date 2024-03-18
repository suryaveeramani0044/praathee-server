const { validationResult, body } = require("express-validator");

const emailValidator = body("email")
  .notEmpty()
  .withMessage("email field connot be empty")
  .isEmail()
  .withMessage("please provide valid email");

const password = body("password")
  .notEmpty()
  .withMessage("password field connot be empty")
  .isLength({ min: 5 })
  .withMessage("password should be minimum length 5");

const firstName = body("firstName")
  .notEmpty()
  .withMessage("firstName field connot be empty")
  .isString()
  .withMessage("please provide value has string");

const lastName = body("lastName")
  .notEmpty()
  .withMessage("lastName field connot be empty")
  .isString()
  .withMessage("please provide value has string");

const address = body("address")
  .notEmpty()
  .withMessage("address field connot be empty");

exports.LoginValidation = () => {
  return [emailValidator, password];
};

exports.adduserValidation = () => {
  return [firstName, emailValidator, password, address, lastName];
};

exports.Validator = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array()[0] });
  }
  next();
};
