const { Router } = require("express");
const router = Router();
const restaurantController = require("../../controllers/restaurant.controller");

const { validateRestaurant } = require("../../validators/restaurant.validator");
const jwtMiddlewares = require("../../middlewares/authjwt");

const checkPermissions = require("../../middlewares/checkPermissions");
const { isValidParamId } = require("../../middlewares/isValidId");
const belongOrganization = require("../../middlewares/belongOrganization");
const notDuplicateInformation = require("../../middlewares/notDuplicateInformation");
const existsRestaurant = require("../../middlewares/existResource");

router
  .get(
    "/path",
    [
      jwtMiddlewares.verifyToken,
      checkPermissions(
        ["order", "manage_menu"],
        "requires permissions to order or manage the menu"
      ),
    ],
    restaurantController.getAnyRestaurantPath
  )
  .get(
    "/path/:id",
    [
      jwtMiddlewares.verifyToken,
      isValidParamId,
      existsRestaurant("Restaurant"),
      belongOrganization("params"),
      checkPermissions(
        ["order", "manage_menu"],
        "requires permissions to order or manage the menu"
      ),
    ],
    restaurantController.getRestaurantPathById
  )
  .get("/", [jwtMiddlewares.verifyToken], restaurantController.getRestaurants)
  .get(
    "/:id",
    [
      jwtMiddlewares.verifyToken,
      isValidParamId,
      existsRestaurant("Restaurant"),
      belongOrganization("params"),
      checkPermissions(
        ["manage_restaurant"],
        "requires permissions to manage the restaurant"
      ),
    ],
    restaurantController.getRestaurantById
  )
  .post(
    "/",
    validateRestaurant,
    [
      jwtMiddlewares.verifyToken,
      checkPermissions(
        ["manage_restaurant"],
        "requires permissions to manage restaurants"
      ),
    ],
    async (req, res, next) => {
      req.body.owner = req.userId;
      next();
    },
    notDuplicateInformation(true, "Restaurant", ["name", "owner"]),
    restaurantController.addRestaurant
  )
  .delete(
    "/:id",
    [
      jwtMiddlewares.verifyToken,
      isValidParamId,
      existsRestaurant("Restaurant"),
      belongOrganization("params"),
      checkPermissions(
        ["manage_restaurant"],
        "requires permissions to manage the restaurant"
      ),
    ],
    restaurantController.deleteRestaurant
  )
  .put(
    "/:id",
    validateRestaurant,
    [
      jwtMiddlewares.verifyToken,
      isValidParamId,
      existsRestaurant("Restaurant"),
      checkPermissions(
        ["manage_restaurant"],
        "requires permissions to manage the restaurant"
      ),
    ],
    async (req, res, next) => {
      req.body.owner = req.userId;
      next();
    },
    notDuplicateInformation(false, "Restaurant", ["name", "owner"]),
    restaurantController.updateRestaurant
  );

module.exports = router;
