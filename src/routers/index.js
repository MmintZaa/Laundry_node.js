const loginController =  require("../controllers/login.controller");
const { Router } = require("express");
const userController = require("../controllers/user.controller");
const paymentController = require("../controllers/payment.controller");
const laundryController = require("../controllers/laundry.controller");
const router = Router();


router.use("/login", loginController);
router.use("/user", userController);
router.use("/payment", paymentController);
router.use("/laundry", laundryController);


module.exports = router;