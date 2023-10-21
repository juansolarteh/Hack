const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate.helper");

const validateRestaurant = [
  check("name").exists().isString().isLength({min: 1, max: 50}),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateRestaurant };
