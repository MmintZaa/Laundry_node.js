const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    register,
  };
  
  
  module.exports = authService;