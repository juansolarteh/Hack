const restaurant = require("../models/Restaurant");
const { httpErrorServer } = require("../helpers/httpError.helper");
let model = undefined;

const belongOrganization = function (ubicationIdRestaurantOrmodelName = "") {
    if (ubicationIdRestaurantOrmodelName == "body") return handleWithBodyIdRest;
    else if (ubicationIdRestaurantOrmodelName == "params") return handleWithParamsIdRest;
    if (ubicationIdRestaurantOrmodelName && ubicationIdRestaurantOrmodelName != "") {
        return async (req, res, next) => {
            model = require(`../models/${ubicationIdRestaurantOrmodelName}`);
            const idResource = req.params.id;
            let exist;
            try {
                exist = await restaurant.exists({
                    staff: req.userId,
                    _id: (await model.findById(idResource)).idRestaurant,
                });
            } catch (error) {
                return httpErrorServer(res, error.message);
            }
            return exist
                ? next()
                : res.status(403).send("you not belong to the organization");
        };
    }
    throw new Error(
        `you have to define the corresponding path to a model that contains the necessary idRestaurant`
    );
};

const handleWithBodyIdRest = async (req, res, next) => {
    const { idRestaurant } = req.body;
    let exist;
    try {
        exist = await restaurant.exists({
            _id: idRestaurant,
            staff: req.userId,
        });
    } catch (error) {
        return httpErrorServer(res, error.message);
    }
    return exist
        ? next()
        : res.status(403).send("you not belong to the organization");
};

const handleWithParamsIdRest = async (req, res, next) => {
    let _id = req.params.idRest;
    if (!_id) {
        _id = req.params.id;
    }
    if (!_id)
        throw new Error(
            'param id Restaurant have to be given with param name "id" or "idRest"'
        );
    let exist;
    try {
        exist = await restaurant.exists({
            _id,
            staff: req.userId,
        });
    } catch (error) {
        return httpErrorServer(res, error.message);
    }
    return exist
        ? next()
        : res.status(403).send("you not belong to the organization");
};

module.exports = belongOrganization;
