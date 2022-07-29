const mongoose = require("mongoose");
const CartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    Products: [
      {
        productId: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmt: { type: Number, required: true },
    paymentMode: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
