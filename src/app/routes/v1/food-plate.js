const { Router } = require("express");
const router = Router();
const foodPlateController = require("../../controllers/food-plate.controller");

const { validateFoodPlate } = require("../../validators/food-plate.validator");
const jwtMiddlewares = require("../../middlewares/authjwt");

const { isValidParamRestId, isValidParamId } = require("../../middlewares/isValidId")
const checkPermissions = require("../../middlewares/checkPermissions");
const belongOrganization = require("../../middlewares/belongOrganization");
const notDuplicateInformation = require("../../middlewares/notDuplicateInformation")
const existsFoodPlate = require('../../middlewares/existResource')

router
    .get(
        "/byRest/:idRest",
        [
            jwtMiddlewares.verifyToken,
            isValidParamRestId,
            belongOrganization("params"),
            checkPermissions(
                ["order", "manage_menu"],
                "requires permissions to order or manage the menu"
            ),
        ],
        foodPlateController.getFoodPlatesByIdRest
    )
    .post(
        "/",
        validateFoodPlate,
        [
            jwtMiddlewares.verifyToken,
            belongOrganization("body"),
            checkPermissions(
                ["manage_menu"],
                "requires permissions to manage the menu"
            ),
        ],
        notDuplicateInformation(true, 'FoodPlate', ["name", "idRestaurant"]),
        foodPlateController.addFoodPlate
    )
    .delete(
        "/:id",
        [
            jwtMiddlewares.verifyToken,
            isValidParamId,
            existsFoodPlate("FoodPlate"),
            belongOrganization("FoodPlate"),
            checkPermissions(
                ["manage_menu"],
                "requires permissions to manage the menu"
            ),
        ],
        foodPlateController.deleteFoodPlate
    )
    .put(
        "/:id",
        validateFoodPlate,
        [
            jwtMiddlewares.verifyToken,
            isValidParamId,
            existsFoodPlate("FoodPlate"),
            belongOrganization("FoodPlate"),
            checkPermissions(
                ["manage_menu"],
                "requires permissions to manage the menu"
            ),
        ],
        notDuplicateInformation(false, 'FoodPlate', ["name", "idRestaurant"]),
        foodPlateController.updateFoodPlate
    );

module.exports = router;
