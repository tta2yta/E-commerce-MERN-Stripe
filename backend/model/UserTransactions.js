const mongoose = require("mongoose");
const UserTransactionsSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserTransactions", UserTransactionsSchema);
