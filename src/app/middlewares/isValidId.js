const ObjectId = require('mongoose').Types.ObjectId;

const isValidParamRestId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.idRest))
        return res.status(400).send('invalid IdRestaurant given')
    next()
}

const isValidBodyRestId = (req, res, next) => {
    const { idRestaurant } = req.body
    console.log(idRestaurant)
    next()
}

const isValidParamId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('invalid Id given')
    next()
}

module.exports = {isValidParamRestId, isValidParamId, isValidBodyRestId};