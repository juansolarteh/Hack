const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate.helper");

const validateSignin = [
  check("email").exists().isEmail(),
  check("password").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateSignin };
