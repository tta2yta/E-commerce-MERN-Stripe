const Order = require("../model/order");
const express = require("express");
const router = express.Router();
const {
  checkToken,
  checKTokenAndSeller,
  checkTokenAndAuthorization,
} = require("../middlewares/middlewares");

// CRUD operations
// add Order

router.post("/", checkToken, async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get Orders
router.get("/", checKTokenAndSeller, async (req, res, next) => {
  try {
    const Orders = await Order.find({});
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get user' order
router.get("/:userId", checkTokenAndAuthorization, async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const Orders = await Order.find({ userId });
    res.status(200).send(Orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// update Order by Id
router.patch("/:id", checKTokenAndSeller, async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json({
      message: "Order is updated",
      updatedOrder,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// delete Order by Id

router.delete("/:id", checKTokenAndSeller, async (req, res, next) => {
  const id = req.params.id;
  try {
    const Order = await Order.findByIdAndDelete(id);
    res.status(200).json({
      message: "Order is deleted successfully",
      Order,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
