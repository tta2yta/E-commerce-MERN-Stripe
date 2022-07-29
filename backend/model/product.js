const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    catagories: { type: Array },
    productImage: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
