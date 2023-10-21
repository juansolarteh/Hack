const { Router } = require("express");
const router = Router();
const authController = require("../../controllers/auth.contoller");
const { validateSignin } = require("../../validators/auth.validator");

router
  .post("/signin", validateSignin, authController.signin)

module.exports = router;
