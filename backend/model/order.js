const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
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
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
