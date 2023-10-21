const foodPlate = require("../models/FoodPlate");
const { httpErrorServer } = require("../helpers/httpError.helper");

const getFoodPlatesByIdRest = async (req, res) => {
    let foodPlates;
    try {
        foodPlates = await foodPlate
            .find(
                { idRestaurant: req.params.idRest },
                { createdAt: 0, updatedAt: 0, idRestaurant: 0 }
            )
            .sort("name");
    } catch (error) {
        return httpErrorServer(res, error.message);
    }
    res.status(200).json(foodPlates);
};

const addFoodPlate = async (req, res) => {
    const { name, description, image, price, idRestaurant } = req.body;
    const foodPlateGiven = { name, description, image, price };

    let newFoodPlate = new foodPlate({idRestaurant, ...foodPlateGiven});
    try {
        let _id = (await newFoodPlate.save()).id;
        res.status(201).json({
            _id,
            ...foodPlateGiven
        });
    } catch (error) {
        return httpErrorServer(res, error.message);
    }
};

const deleteFoodPlate = async (req, res) => {
    try {
        let _id = (
            await foodPlate.findByIdAndDelete(req.params.id)
        )._id;
        return res.status(200).json({
            _id
        });
    } catch (error) {
        httpErrorServer(res, error.message);
    }
};

const updateFoodPlate = async (req, res) => {
    const { name, description, image, price } = req.body;
    const foodPlateGiven = { name, description, image, price };

    try {
        let _id = (
            await foodPlate.findByIdAndUpdate(req.params.id, foodPlateGiven)
        )._id;
        return res.status(201).json({
            _id,
            ...foodPlateGiven
        });
    } catch (error) {
        httpErrorServer(res, error.message);
    }
};

module.exports = {
    getFoodPlatesByIdRest,
    addFoodPlate,
    deleteFoodPlate,
    updateFoodPlate,
};
