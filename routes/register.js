var express = require("express");
var router = express.Router();
const registers = require("../model/register");

router.post("/create", async function (req, res, next) {
  try {
    var data = req.body;
    // var check_register = await registers.findOne({
    //   id_card: data.id_card,
    // });

    // if (check_register) {
    //   return res.send({
    //     message: "Duplicate Register",
    //   });
    // } else {
    //   var register = new registers();
    //   register.name = data.firstname;
    //   register.id_card = data.id_card;
    //   register.email = data.email;
    //   register.clinic_name = data.clinic_name;
    //   register.license_number = data.license_number;
    //   register.objective = data.objective;
    //   register.confirm_data = data.confirm_data;

    //   console.log(data.confirm_data);
    //   if (data.confirm_data == true) {
    //     //true -> 2>1 , "a" == "a", true - false => true == true
    //     let save_register = await register.save();
    //     return res.status(200).json(save_register);
    //   } else {
    //     // false, "", 0, null , undefined
    //     return res.status(400).send("Failed");
    //   }
    // }
    var register = new registers();
    register.name = data.name;
    register.id_card = data.id_card;
    register.email = data.email;
    register.clinic_name = data.clinic_name;
    register.license_number = data.license_number;
    register.objective = data.objective;
    register.confirm_data = data.confirm_data;

    if (data.confirm_data) {
      //true -> 2>1 , "a" == "a", true - false => true == true
      let save_register = await register.save();
      return res.status(200).json(save_register);
    } else {
      // false, "", 0, null , undefined
      return res.status(400).send("Failed");
    }
  } catch (error) {
    return res.send("Create Failed", error);
  }
});

router.post("/get_all", async function (req, res, next) {
  try {
    let register = await registers.find();

    return res.json(register);
  } catch (error) {
    return res.send("Get All Failed", error);
  }
});

// router.get("/:id", async function (req, res, next)
router.post("/get/:id", async function (req, res, next) {
  try {
    let { id } = req.params;
    let register = await registers.findById(id);

    return res.json(register);
  } catch (error) {
    return res.send("Get ByID Failed", error);
  }
});

router.post("/update", async function (req, res, next) {
  try {
    var data = req.body;
    var find_register = await registers.findOne({
      firstname: req.query.firstname,
      lastname: req.query.lastname,
    });

    if (!find_register) {
      return res.send("Is Data not Found");
    } else {
      find_register.firstname = data.firstname;
      find_register.lastname = data.lastname;
      find_register.id_card = data.id_card;
      find_register.phone = data.phone;
      find_register.email = data.email;
      find_register.clinic_name = data.clinic_name;
      find_register.license_number = data.license_number;

      find_register.confirm_data = data.confirm_data;
      find_register.subscribe = data.subscribe;

      if (find_register.confirm_data) {
        let show_register = await find_register.save();
        return res.json({ message: "Update Success", register: show_register });
      } else {
        return res.status(400).json("Update Failed");
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.send("Update Failed", error);
  }
});

router.post("/delete/:id", async function (req, res, next) {
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
