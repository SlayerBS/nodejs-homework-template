const express = require("express");
const router = express.Router();

const {
  registrationController,
  loginController,
  logoutController,
} = require("../../controllers/users.controller");
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");

router.post("/registration", registrationController);
router.post("/login", loginLimit, loginController);
router.post("/logout", guard, logoutController);

module.exports = router;
