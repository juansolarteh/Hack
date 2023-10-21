const { check } = require("express-validator");
const { validateResult } = require("../helpers/validate.helper");

const validateFoodPlate = [
  check("idRestaurant").exists().isMongoId(),
  check("name").exists().isString().isLength({min: 1, max: 50}),
  check("description").exists().isString().isLength({min: 1, max: 1000}),
  check("price").exists().isNumeric().custom((value) => {
    if (value <= 0) throw new Error('price must be greater than zero(0)')
    return true
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateFoodPlate };
