var express = require("express");
var router = express.Router();
var product = require("../model/products");

//create products
router.post("/", async function (req, res, next) {
  try {
    let products = new product({
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
      amount: req.body.amount,
      image: req.body.image
    });

    let save = await products.save();
    
    //return res.json(save);
    return res.json({message:'Insert Success', data:save});
    //res.status(200).send({save:'insert success'})
  } catch (error) {
    return res.send("Create Failed", error);
  }

  res.send(save);
});

//update products
router.put("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let Products = await product.findByIdAndUpdate(id, {
      product_id: req.body.product_id,
      product_name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
      amount: req.body.amount,
      image: req.body.image
    });

    let save = await product.findById(id);

    //res.send(save);

    return res.json({ message:'Update Success' , data:save });
  } catch (error) {
    return res.send("Update Failed", error);
  }
});

//delete products
router.delete("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let data = await product.findByIdAndDelete(id);

    //return res.send(data);
    return res.json({message:'Delete Success', data:data});
  } catch (error) {
    return res.send("Delete Failed", error);
  }
});

//get all products
router.get("/", async function (req, res, next) {
  try {
    let products = await product.find();

    //res.send(products);

     res.send(products);
  } catch (error) {
     res.send("Get All Failed", error);
  }
});

//get by id products
router.get("/:id", async function (req, res, next) {
  try {
    let { id } = req.params;

    let products = await product.findById(id);

    //res.send(products);

    return res.json(products);
  } catch (error) {
    return res.send("Get ByID Failed", error);
  }
});

module.exports = router;
