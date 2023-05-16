var express = require("express");
var router = express.Router();
var order = require("../model/order");
var product = require("../model/products");

//create order
router.post("/", async function (req, res, next) {
  try {
    let orders = new order({
      order_id: req.body.order_id,
      firstname: req.body.firstname,
      total: req.body.total,
      detail: req.body.detail,
    });

    let data = await orders.save();

    //res.send(data);

    return res.json(data);
  } catch (error) {
    return res.send("Create Failed", error);
  }
});

//get all order
router.get("/", async function (req, res, next) {
  try {
    let orders = await order.find();

    //res.send(orders);

    return res.json(orders);
  } catch (error) {
    return res.send("Get All Failed", error);
  }
});

//get by id order
router.get("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let orders = await order.findById(id);

    //res.send(orders);

    return res.json(orders);
  } catch (error) {
    return res.send("Get ByID Failed", error);
  }
});

module.exports = router;
