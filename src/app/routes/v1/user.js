const { Router } = require("express");
const router = Router();
const userController = require("../../controllers/user.controller");

const jwtMiddlewares = require("../../middlewares/authjwt")

router
  .get("/permissions", jwtMiddlewares.verifyToken, userController.getPermissions)

module.exports = router;
