const { httpErrorServer } = require("../helpers/httpError.helper");
let model = undefined;

const notDuplicateInformation = function (
  isPost = false,
  modelName,
  comparativeProps,
  errorMessage = "duplicate name not allowed"
) {
  if (!modelName)
    throw new Error(
      "You have to define the respective model to compare the information"
    );
  if (!comparativeProps)
    throw new Error(
      `You have to define the comparative properties to find at the ${model} model`
    );
  return isPost
    ? async (req, res, next) => {
        const search = {};
        comparativeProps.forEach(
          (property) => (search[property] = req.body[property])
        );
        model = require(`../models/${modelName}`);

        try {
          let existData = await model
            .exists(search)
            .transform((resp) => (resp ? true : false));
          if (existData) return res.status(400).send(errorMessage);
        } catch (error) {
          return httpErrorServer(res, error.message);
        }
        next();
      }
    : async (req, res, next) => {
        const search = {};
        comparativeProps.forEach(
          (property) => (search[property] = req.body[property])
        );
        model = require(`../models/${modelName}`);

        try {
          let existData = await model
            .exists(search)
            .where("_id")
            .ne(req.params.id)
            .transform((resp) => (resp ? true : false));
          if (existData) return res.status(400).send(errorMessage);
        } catch (error) {
          return httpErrorServer(res, error.message);
        }
        next();
      };
};

module.exports = notDuplicateInformation;
