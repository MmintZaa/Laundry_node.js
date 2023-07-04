const authController =  require("../controllers/auth.controller");
const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = Router();


router.use("/auth", authController);
router.use("/users", userController);


module.exports = router;