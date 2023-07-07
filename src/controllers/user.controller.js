const { Router } = require("express");
const User = require("../models/user.model");
const verifyToken = require("../middlewares/verifyToken.middleware");
const userController = Router();
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

userController.post("/create",
  async (req, res, next) => {
    try {
      const validateResult = validationResult(req);
      if (!validateResult.isEmpty()) {
        return res.status(400).json({
          message: "validation fail",
          additionValue: validateResult.array(),
        });
      }
   
      //const payload = req.body;
      const result = await userService.users(req, res, next);
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

userController.get("/get_all", async (req, res, next) => {
  try {
    const result = await userService.get_all();
   // res.status(200).json(result);
   res.status(200).json({
            status: result[0],
            message: result[1],
           count: result[2],
            data: result[3]
        })

  } catch (error) {
    next(error);
  }
});

userController.put("/update",
  async (req, res, next) => {
    try {    
      const maill = req.body;
      const result = await userService.update_users(maill);
      res.status(200).json({
            status: result[0],
            message: result[1],           
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

module.exports = userController;