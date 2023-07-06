const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (username, password) => {
  try {
    if (username) {
      const existUser = await User.findOne({
        username,
      });
      const matched = bcrypt.compareSync(password, existUser.password);
      if (existUser && matched) {
        const token = jwt.sign(
          {
            userId: existUser.userId,
         
          },
          // "jwt-secret",
          process.env.JWT_SECRET,
          {
            expiresIn: "5d",
          }
        );
        return {
          message: "login success",
          id: existUser.userId,
          token,
        };
      } else {
        throw new Error("Invalid username or password");
      }
    } else {
      throw new Error("Invalid Username");
    }
  } catch (error) {
    throw error;
  }
};



const loginService = {
  login,

};


module.exports = loginService;