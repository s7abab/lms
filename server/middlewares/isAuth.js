const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");
//token verify
const isAuth = async (req, res, next) => {
  try {
      console.log(req.headers)
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'Internal server error'
    })
  }
};

module.exports = { isAuth };
