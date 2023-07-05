const loginController =  require("../controllers/login.controller");
const { Router } = require("express");
const registerController = require("../controllers/register.controller");
const router = Router();


router.use("/login", loginController);
router.use("/register", registerController);


module.exports = router;