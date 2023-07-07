const loginController =  require("../controllers/login.controller");
const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = Router();


router.use("/login", loginController);
router.use("/user", userController);


module.exports = router;