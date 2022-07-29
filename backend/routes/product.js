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
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get products->for time being let's remove the middleware(checkToken) to get all the product list with out token q first landing of the website
router.get("/", async (req, res, next) => {
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
    const product = await Product.findById(id);
    if (product) {
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status(200).json({
        message: "Product is updated",
        updatedProduct,
      });
    } else {
      res.status(404).json({
        message: "product not Found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// delete product by Id

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

router.get(["/filter/:name/:catg", "/filter/:catg"], async (req, res, next) => {
  const name = req.params.name;
  const catg = req.params.catg;
  try {
    let query = {};
    if (name === undefined) {
      query = { catagories: [catg] };
    } else if (name !== null || name !== undefined) {
      // case insenstive search using regression
      (query = { name: { $regex: name, $options: "i" } }),
        { catagories: [req.params.catg] };
    }
    Product.find(
      {
        // $or: [{ name: { $regex: name } }, { catagories: [req.params.catg] }],
        $or: [query],
      },
      function (err, user) {
        if (err) {
          res.send(err);
        }
        res.json(user);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
