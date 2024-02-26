const express = require("express");
const { register, login } = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

// register
router.route("/register").post(register);
router.route("/login").post(isAuth,login);

module.exports = router;
