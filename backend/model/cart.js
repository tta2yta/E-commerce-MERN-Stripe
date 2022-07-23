const mongoose = require("mongoose");
const CartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    Products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmt: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
