const express = require("express");
const { register, login, logout } = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("logout").get(logout);

module.exports = router;
