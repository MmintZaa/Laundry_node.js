const Laundry = require("../models/laundry.model");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");

const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken.middleware");
const laundryController = Router();
const laundryService = require("../services/laundry.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

laundryController.post("/createLaundryRecord", async (req, res, next) => {
    try {
     
      const token = String(req.headers.authorization).split(' ')[1]
      
      console.log('token ', token)
      const decoded = jwt.decode(token);

      const userId = decoded.user_id;
      
      const result = await laundryService.laundryRecord(req, userId);
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

laundryController.get("/send", async (req, res, next) => {
  try {
    const token = String(req.headers.authorization).split(' ')[1]
      
    console.log('token ', token)
    const decoded = jwt.decode(token);

    const userId = decoded.user_id;

    const result = await laundryService.send(userId);
    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
});


module.exports = laundryController;


