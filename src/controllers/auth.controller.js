const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken.middleware");
const authService = require("../services/auth.service");
const {validationEmail, validationUsername} = require("../middlewares/validations/registerForm.validation");
const { validationResult } = require("express-validator");
const authController = Router();


authController.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

authController.post("/register", validationEmail(), validationUsername(),
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
      const result = await authService.register(payload);
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

authController.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = authController;