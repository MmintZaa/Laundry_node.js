const { Router } = require("express");
const User = require("../models/user.model");
const verifyToken = require("../middlewares/verifyToken.middleware");
const userController = Router();
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

userController.post("/create", async (req, res, next) => {
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

userController.get("/getId", async (req, res, next) => {
    try {    
      const user = req.body;
      const token = String(req.headers.authorization).split(' ')[1]
      
      //console.log('token ', token)
      const decoded = jwt.decode(token);
      //console.log(decoded);
      const result = await userService.getId_users(user);
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

userController.put("/update", async (req, res, next) => {
    try {    
      const user = req.body;
      const result = await userService.update_users(user);
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

userController.delete("/delete",async (req, res, next) => {
    try {    
      const user = req.body;
      const result = await userService.delete_users(user);
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


userController.get("/getUserExcel", async (req, res, next) => {

  try {
    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
      return res.status(400).json({
        message: "validation fail",
        additionValue: validateResult.array(),
      });
    }
 

    const result = await userService.getUserExcel(req, res);
    return result
  } catch (error) {
    if (error.code === 11000) {
      next(new Error("Duplicate Username"));
    } else {
      next(error);
    }
  }
}
);







module.exports = userController;