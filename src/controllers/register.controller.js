const { Router } = require("express");
const User = require("../models/user.model");
const verifyToken = require("../middlewares/verifyToken.middleware");
const registerController = Router();
const registerService = require("../services/register.service");

registerController.post("/register", validationEmail(), validationUsername(),
  async (req, res, next) => {
    try {
      const validateResult = validationResult(req);
      if (!validateResult.isEmpty()) {
        return res.status(400).json({
          message: "validation fail",
          additionValue: validateResult.array(),
        });
      }
      console.log(validateResult);
      const payload = req.body;
      const result = await registerService.register(payload);
      res.status(200).json(result);
    } catch (error) {
      if (error.code === 11000) {
        next(new Error("Duplicate Username"));
      } else {
        next(error);
      }
    }
  }
);

// userController.get("/current", verifyToken, async (req, res, next) => {
//   try {
//     const userId = req.user.userId;
//     const result = await User.findOne({ userId });
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });


// registerController.get("/verify-token", verifyToken, (req, res) => {
//   res.status(200).json(req.user);
// });

module.exports = registerController;