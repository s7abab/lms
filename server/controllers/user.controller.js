const userModel = require("../models/user.model");
const comparePassword = require("../utils/comaprePassword");
const hashPassword = require("../utils/hashpassword");
const { generateToken } = require("../utils/jwt");

// register
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // req body validation
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "username and password required",
      });
    }
    // check user exists or not
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User alredy exists",
      });
    }
    // hashpassword
    const hashedPassword = await hashPassword(password);

    // save user
    const newUser = await userModel.create({
      username,
      password:hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "Registration successfull",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: " Internal Server Error",
    });
  }
};

// login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // req body validation
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "username and password required",
      });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // check password match
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // create jwt token
    const token = generateToken(user);
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: " Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};
