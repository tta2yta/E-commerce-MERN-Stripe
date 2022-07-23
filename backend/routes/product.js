const Product = require("../model/product");
const express = require("express");
const router = express.Router();
const {
  checkToken,
  checKTokenAndSeller,
  checkTokenAndAuthorization,
} = require("../middlewares/middlewares");
const multer = require("multer");

// CRUD operations
// add product

router.post("/", checKTokenAndSeller, async (req, res, next) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get products
router.get("/", checkToken, async (req, res, next) => {
  // find products by passing query as new or catagories
  const byNew = req.query.new;
  const byCatagory = req.query.catagory;

  try {
    let products;
    if (byNew) {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(1);
    } else if (byCatagory) {
      products = await Product.find({
        catagories: {
          $in: [byCatagory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get by productId
router.get("/:ProductId", async (req, res, next) => {
  const id = req.params.ProductId;
  try {
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// update product by Id
router.patch("/:id", checKTokenAndSeller, async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json({
      message: "Product is updated",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// delet product by Id

router.delete("/:id", checKTokenAndSeller, async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "product is deleted successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
