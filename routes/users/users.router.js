const express = require("express");
const router = express.Router();

const {
  registrationController,
  loginController,
  logoutController,
  currentController,
} = require("../../controllers/users.controller");
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");

router.post("/signup", registrationController);
router.post("/login", loginLimit, loginController);
router.post("/logout", guard, logoutController);
router.get("/current", guard, currentController);

module.exports = router;