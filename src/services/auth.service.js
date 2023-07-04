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
            email: existUser.email,
            firstName: existUser.firstName,
            lastName: existUser.lastName,
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

const register = async (payload) => {
  try {
    const hashedPassword = bcrypt.hashSync(payload.password, 10);
    const newUser = new User({ ...payload, password: hashedPassword });
    await newUser.save();
    const { password, ...user } = newUser.toObject();
    return user;
  } catch (error) {
    throw error;
  }
};

const authService = {
  login,
  register,
};


module.exports = authService;