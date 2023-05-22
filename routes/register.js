var express = require("express");
var router = express.Router();
const registers = require("../model/register");

router.post("/", async function (req, res, next) {
  try {
    var data = req.body;
    var register = new registers();
    register.firstname = data.firstname;
    register.lastname = data.lastname;
    register.id_card = data.id_card;
    register.phone = data.phone;
    register.email = data.email;
    register.clinic_name = data.clinic_name;
    
    register.license_number = data.license_number;

    let save_register = await register.save();

    return res.status(200).json(save_register);
  } catch (error) {
    return res.send("Create Failed", error);
  }
});

router.get("/", async function (req, res, next) {
  try {
    let register = await registers.find();

    return res.json(register);
  } catch (error) {
    return res.send("Get All Failed", error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    let register = await registers.findById(id);

    return res.json(register);
  } catch (error) {
    return res.send("Get ByID Failed", error);
  }
});

router.put("", async function (req, res, next) {
  try {
    var data = req.body;
    let find_register = await registers.findOne({
      firstname: req.query.firstname,
      lastname: req.query.lastname,
    });

    find_register.firstname = data.firstname;
    find_register.lastname = data.lastname;
    find_register.id_card = data.id_card;
    find_register.phone = data.phone;
    find_register.email = data.email;
    find_register.clinic_name = data.clinic_name;
    find_register.license_number = data.license_number;

    let show_register = await find_register.save();

    return res.json({ message: "Update Success", register: show_register });
  } catch (error) {
    console.log(error.message);
    return res.send("Update Failed", error);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let show_register = await registers.findByIdAndDelete(id);

    //return res.send(data);
    return res.json({ message: "Delete Success", register: show_register });
  } catch (error) {
    return res.send("Delete Failed", error);
  }
});
module.exports = router;
