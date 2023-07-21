const { Router } = require("express");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const verifyToken = require("../middlewares/verifyToken.middleware");
const paymentController = Router();
const paymentService = require("../services/payment.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

paymentController.post("/createPayment", async (req, res, next) => {
    try {
      const validateResult = validationResult(req);
      if (!validateResult.isEmpty()) {
        return res.status(400).json({
          message: "validation fail",
          additionValue: validateResult.array(),
        });
      }
   
      const token = String(req.headers.authorization).split(' ')[1]
      
      //console.log('token ', token)
      const decoded = jwt.decode(token);

      const userId = decoded.user_id;
      
      const result = await paymentService.payment(req, userId);
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


paymentController.post("/getId", async (req, res, next) => {
  try {    
    const user = req.body;
    const token = String(req.headers.authorization).split(' ')[1]
    
    //console.log('token ', token)
    const decoded = jwt.decode(token);
    //console.log(decoded);
    const result = await paymentService.getId_payment(user);
    res.status(200).json({
      status: result[0],
      message: result[1],
      data: result[2]          
      })

  } catch (error) {
    if (error.code === 11000) {
      next(new Error("Duplicate Username"));
    } else {
      next(error);
    }
  }
}
);


module.exports = paymentController;