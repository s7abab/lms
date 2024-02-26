const express = require("express");
const { register, login } = require("../controllers/user.controller");

const router = express.Router();

// register
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
