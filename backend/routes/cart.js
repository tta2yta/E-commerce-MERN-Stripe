const Cart = require("../model/cart");
const express = require("express");
const router = express.Router();
const {
  checkToken,
  checKTokenAndSeller,
  checkTokenAndAuthorization,
} = require("../middlewares/middlewares");
const multer = require("multer");

// CRUD operations

router.post("/", checkToken, async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({
      message: "cart added successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// only the one who have admin privellages can see all the carts
router.get("/", checKTokenAndSeller, async (req, res, next) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:userId", checkTokenAndAuthorization, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// pass userId of the cart to edit the cart
router.patch("/:id", checkTokenAndAuthorization, async (req, res, next) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({
      message: "cart is updated successsfully!",
      updatedCart,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
// the owner of the cart and the admin can only make change
router.delete("/:id", checkToken, async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    console.log("yonas", cart);
    res.status(200).json({
      message: "The cart is deleted successfully!",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
