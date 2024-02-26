const bcrypt = require("bcryptjs");

const comparePassword = async (password, userPassword) => {
  try {
    const matchpassword = await bcrypt.compare(password, userPassword);
    return matchpassword;
  } catch (error) {
    throw error;
  }
};

module.exports = comparePassword;
