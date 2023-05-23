var express = require("express");
var router = express.Router();
var contacts = require("../model/contact");

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
    contact.subject = data.subject;
    contact.message = data.message;

    let save_contact = await contact.save();

    //res.send(data);

    return res.status(200).json(save_contact);
  } catch (error) {
    return res.send("Create Failed", error);
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

    test_contact.name = data.name
    test_contact.email = data.email
    test_contact.subject = data.subject
    test_contact.message = data.message

    let show_contact = await test_contact.save()

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

module.exports = router;
