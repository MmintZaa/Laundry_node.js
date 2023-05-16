var express = require("express");
var router = express.Router();
var users = require("../model/users");

//create user
router.post("/", async (req, res, next) => {
  try {
    let user = new users({
      user_id: req.body.user_id,
      username: req.body.username,
      password: req.body.password,
      fristname: req.body.fristname,
      lastname: req.body.lastname,
      age: req.body.age,
      sex: req.body.sex,
    });
    let save = await user.save();

    //res.send(save);

    return res.json(save);
  } catch (error) {
    return res.send("Create Failed");
  }
});

//update user
router.put("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    let user = await users.findOneAndUpdate(id, {
      user_id: req.body.user_id,
      username: req.body.username,
      password: req.body.password,
      fristname: req.body.fristname,
      lastname: req.body.lastname,
      age: req.body.age,
      sex: req.body.sex,
    });

    let data = await users.findById(id);

    //res.send(data);

    return res.json(data);
  } catch (error) {
    return res.send("Update Failed", error);
  }
});

//delete user
router.delete("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let data = await users.findByIdAndDelete(id);

    //ดักที่ไม่แสดงออกเช่นลบไปแล้ว จะลบไอดีเดิมซ้ำ
    // if (data == null) {
    //   return res.send("Not Found Data");
    // }
    //!data เหมือนหัน
    if (!data) {
      return res.send("Not Found Data");
    }

    return res.json(data);
  } catch (error) {
    return res.send("Delete Failed", error);
  }
});

//get all user
router.get("/", async function (req, res, next) {
  try {
    let user = await users.find();

    return res.json(user);
  } catch (error) {
    return res.send("Get All Failed", error);
  }
});

//get by id user
router.get("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let user = await users.findById(id);

    return res.json(user);
  } catch (error) {
    return res.send("Get ByID Failed", error);
  }
});

module.exports = router;
