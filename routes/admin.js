let express = require("express");
let router = express.Router();
const admins = require("../model/admin");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/authen");

router.post("/createadmin", async function (req, res) {
  try {
    if (!(req.body.username && req.body.password)) {
      return res.status(400).json({
        status_code: "400",
        message: "Please complete your code",
      });
    }
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
    let admin = new admins();
    admin.username = req.body.username;
    admin.password = encryptedPassword;

    let save_admin = await admin.save();

    return res.status(200).json({
      status_code: "200",
      message: "Creat Admin Success",
    });
  } catch (error) {
    return res.send("Create Admin Failed", error);
  }
});

router.post("/loginadmin", async function (req, res) {
  try {
    if (!(req.body.username && req.body.password)) {
      return res.status(400).json({
        status_code: "400",
        message: "Please complete your code",
      });
    }
    let login = await admins.findOne({
      username: req.body.username,
    });

    var usernameToken = req.body.username;
    if (login && (await bcrypt.compare(req.body.password, login.password))) {
      const token = jwt.sign(
        { user_id: login._id, usernameToken },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      var data = {
        username: login.username,
        token: token,
      };
      // login.token = token;

      return res.status(200).json({
        status_code: "200",
        message: "Login Success",
        data: data,
      });
    }
    return res.status(401).json({
      status_code: "401",
      message: "Login Failed",
    });
  } catch (error) {
    return res.send("Create Admin Failed", error);
  }
});

module.exports = router;
