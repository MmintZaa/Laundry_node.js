let express = require("express");
let router = express.Router();
const registers = require("../model/register");
let validator = require("validator");
let excel = require("excel4node");
const helper = require("../helper/valid_date");
const helpidcard = require("../helper/validate_IDcard");
const { verifyToken } = require("../middleware/authen");

// router.post("/create", verifyToken, async function (req, res, next)
router.post("/create", async function (req, res, next) {
  try {
    let data = req.body;
    // ========= Check id_card ===========================
    // let check_register = await registers.findOne({
    //   id_card: data.id_card,
    // });

    // if (check_register) {
    //   return res.send({
    //     message: "Duplicate Register",
    //   });
    // } else {
    //   let register = new registers();
    //   register.name = data.name;
    //   register.id_card = data.id_card;
    //   register.email = data.email;
    //   register.clinic_name = data.clinic_name;
    //   register.license_number = data.license_number;
    //   register.objective = data.objective;
    //   register.confirm_data = data.confirm_data;
    //   if (!validator.contains(data.name)) {
    //     return res.json({
    //       status: "fail",
    //       status_code: "400",
    //       message: "invalid name",
    //     });
    //   }

    //   if (!validator.contains(data.id_card)) {
    //     return res.json({
    //       status: "fail",
    //       status_code: "400",
    //       message: "invalid id_card",
    //     });
    //   }

    //   if (!validator.isEmail(data.email)) {
    //     return res.json({
    //       status: "fail",
    //       status_code: "400",
    //       message: "invalid email",
    //     });
    //   }

    //   if (!validator.contains(data.clinic_name)) {
    //     return res.json({
    //       status: "fail",
    //       status_code: "400",
    //       message: "invalid clinic_name",
    //     });
    //   }

    //   if (!validator.contains(data.license_number)) {
    //     return res.json({
    //       status: "fail",
    //       status_code: "400",
    //       message: "invalid license_number",
    //     });
    //   }

    //   if (!validator.contains(data.objective)) {
    //     return res.json({
    //       status: "fail",
    //       status_code: "400",
    //       message: "invalid objective",
    //     });
    //   }

    //   console.log(data.confirm_data);
    //   if (data.confirm_data) {
    //     //true -> 2>1 , "a" == "a", true - false => true == true
    //     let save_register = await register.save();
    //     return res.status(200).json(save_register);
    //   } else {
    //     // false, "", 0, null , undefined
    //     return res.status(400).send("Failed");
    //   }
    // }
    // ==========================================================
    let register = new registers();
    register.name = data.name;
    register.id_card = data.id_card;
    register.email = data.email;
    register.clinic_name = data.clinic_name;
    register.license_number = data.license_number;
    register.objective = data.objective;
    register.confirm_data = data.confirm_data;

    if (!validator.isLength(data.name, { min: 10, max: 30 })) {
      return res.status(400).json({
        massage:
          "your input is shorter than 10 characters or longer than 30 characters",
      });
    }

    if (!helpidcard.validThaiID(data.id_card)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid id card to create register",
      });
    }

    if (!validator.isEmail(data.email)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid email to create register",
      });
    }

    if (!validator.contains(data.clinic_name)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid clinic name to create register",
      });
    }

    if (!validator.contains(data.license_number)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid license number to create register",
      });
    }

    if (!validator.contains(data.objective)) {
      return res.status(400).json({
        status_code: "400",
        message: "invalid objective to create register",
      });
    }

    if (data.confirm_data) {
      //true -> 2>1 , "a" == "a", true - false => true == true
      let save_register = await register.save();
      return res.status(200).json(save_register);
    } else {
      // false, "", 0, null , undefined
      return res.status(400).send("Failed");
    }
  } catch (error) {
    return res.status(500).send({message: "Create Register Failed", error: error.message });
  }
});

router.get("/getRegisterExcel/", async function (req, res, next) {
  try {
    let pipeline = [];

    pipeline.push({
      $sort: {
        createdAt: 1,
      },
    });

    const startDate = new Date(`${req.query.start_date}T00:00:00.000`);
    const endDate = new Date(`${req.query.end_date}T23:59:59.999`);

    if (req.query.start_date && req.query.end_date) {
      pipeline.push({
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      });
    } else if (req.query.start_date) {
      pipeline.push({
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      });
    } else if (req.query.end_date && !req.query.start_date) {
      pipeline.push({
        $match: {
          createdAt: {
            $lte: endDate,
          },
        },
      });
    }

    let register = await registers.aggregate(pipeline);

    const wb = new excel.Workbook({
      defaultFont: {
        size: 14,
        name: "TH SarabunPSK",
        color: "#000000",
      },
    });

    const ws = wb.addWorksheet("Register");

    let styleCenter = wb.createStyle({
      alignment: {
        wrapText: false,
        horizontal: "center",
      },
      font: {
        bold: true,
      },
    });

    let styleLeft = wb.createStyle({
      alignment: {
        wrapText: false,
        horizontal: "left",
      },
    });
    let row = 1;
    let column = 1;
    //write header
    let header = [
      "register_id",
      "name",
      "id_card",
      "email",
      "clinic_name",
      "license_number",
      "objective",
      "created_at",
    ];

    let autoWidthColumnSize = [];

    header.forEach((headerVal) => {
      ws.cell(row, column++).string(String(headerVal)).style(styleCenter);
      autoWidthColumnSize.push(String(headerVal).length + 3);
    });
    register.forEach((bodyVal) => {
      column = 1;
      row++;

      ws.cell(row, column++).string(bodyVal._id.toString()).style(styleLeft);
      ws.cell(row, column++).string(bodyVal.name).style(styleLeft);
      ws.cell(row, column++).string(bodyVal.id_card).style(styleLeft);
      ws.cell(row, column++).string(bodyVal.email).style(styleLeft);
      ws.cell(row, column++).string(bodyVal.clinic_name).style(styleLeft);
      ws.cell(row, column++).string(bodyVal.license_number).style(styleLeft);
      ws.cell(row, column++).string(bodyVal.objective).style(styleLeft);
      // let ts = bodyVal.createdAt;
      // let date_time = new Date(ts);
      // let date = date_time.getDate();
      // let month = date_time.getMonth() + 1;
      // let year = date_time.getFullYear();
      // createAt = date + "/" + month + "/" + year;
      createAt = helper.date_format(bodyVal.createdAt);
      ws.cell(row, column++).string(createAt.toString()).style(styleLeft);
    });

    return wb.write(
      `template_data ${moment()
        .locale("th")
        .add(543, "year")
        .format("DD MMMM YYYY h_mm_ss")}.xlsx`,
      res
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message,
      result: null,
    });
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
    let data = req.body;
    let find_register = await registers.findOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
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
        return res
          .status(400)
          .json({ message: "Update Success", register: show_register });
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
