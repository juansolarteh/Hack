const { httpErrorServer } = require("../helpers/httpError.helper");

const existsResource = function (modelMongooseName = "") {
  if(modelMongooseName == "") throw new Error('You have to define the route of necessary model mongoose')
  return async (req, res, next) => {
    let model = require(`../models/${modelMongooseName}`)
    try {
      let resource = await model.exists({_id: req.params.id})
      if (resource) return next()
    } catch (error) {
      return httpErrorServer(res, error.message);
    }
    return res.status(404).send('given id resource does not exist')
  }
};

module.exports = existsResource;