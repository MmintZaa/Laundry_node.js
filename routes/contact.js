var express = require("express");
var router = express.Router();
var contacts = require("../model/contact");
var validator = require("validator");

router.post("/create", async function (req, res, next) {
  try {
    var data = req.body;
    // let contact = new contacts({
    //   name: data.name,
    //   email: data.email,
    //   subject: data.subject,
    //   message: data.message,
    // });
    //

    var contact = new contacts();
    contact.name = data.name;
    contact.email = data.email;
    contact.phone = data.phone;
    contact.subject = data.subject;
    contact.message = data.message;
    contact.confirm_contact = data.confirm_contact;

    if (!validator.contains(data.name)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid name to create contact",
      });
    }
    if (!validator.isEmail(data.email)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid email to create contact",
      });
    }
    if (!validator.contains(data.phone)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid phone to create contact",
      });
    }
    if (!validator.contains(data.subject)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid subject to create contact",
      });
    }
    if (!validator.contains(data.message)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid message to create contact",
      });
    }

    if (data.confirm_contact) {
      let save_contact = await contact.save();
      return res.status(200).json(save_contact);
    } else {
      return res.status(400).send("Failed");
    }
  } catch (error) {
    return res.send("Create Contact Failed", error);
  }
});

router.post("/get_all", async function (req, res, next) {
  try {
    let contact = await contacts.find();

    return res.json(contact);
  } catch (error) {
    return res.send("Get All Failed", error);
  }
});

router.post("/get/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let contact = await contacts.findById(id);

    return res.json(contact);
  } catch (error) {
    return res.send("Get ByID Failed", error);
  }
});

router.post("/update", async function (req, res, next) {
  try {
    let { id } = req.params;

    var data = req.body;
    // let new_contact = await contacts.findByIdAndUpdate(id, {
    //   name: req.body.name,
    //   email: req.body.email,
    //   subject: req.body.subject,
    //   message: req.body.message,
    // });
    // let new_contact = await contacts.findOneAndUpdate(
    //   {
    //     name: req.query.name,
    //     email: req.query.email,
    //   },
    //   {
    //     $set: {
    //       name: data.name,
    //       email: data.email,
    //       subject: data.subject,
    //       message: data.message,
    //     },
    //   }
    // );

    let test_contact = await contacts.findOne({
      name: req.query.name,
      email: req.query.email,
    });

    test_contact.name = data.name;
    test_contact.email = data.email;
    test_contact.subject = data.subject;
    test_contact.message = data.message;

    let show_contact = await test_contact.save();

    //let contact = await contacts.findById(id);

    //res.send(save);

    return res.json({ message: "Update Success", contact: show_contact });
  } catch (error) {
    console.log(error.message);
    return res.send("Update Failed", error);
  }
});

router.post("/delete/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let contact = await contacts.findByIdAndDelete(id);

    return res.json({ message: "Delete Success", contact: contact });
  } catch (error) {
    return res.send("Delete Failed", error);
  }
});

router.post("/findemail", async function (req, res, next) {
  try {
    var { email } = req.body;
    var data_contract = await contacts.findOne({
      email: email,
      // email: req.body.email,
    });

    //console.log(data_contract);
    if (!data_contract) {
      return res.status(404).send({
        message: "Data Not Found",
      });
    }

    return res.json({ message: "Find Success", contact: data_contract });
  } catch (error) {
    return res.send("Find Failed", error);
  }
});

module.exports = router;
