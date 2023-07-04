const { Router } = require("express");
const User = require("../models/user.model");
const verifyToken = require("../middlewares/verifyToken.middleware");
const userController = Router();


userController.get("/current", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await User.findOne({ userId });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = userController;