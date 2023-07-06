const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken.middleware");
const loginService = require("../services/login.service");
const {validationEmail, validationUsername} = require("../middlewares/validations/registerForm.validation");
const { validationResult } = require("express-validator");
const loginController = Router();


loginController.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await loginService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

loginController.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = loginController;