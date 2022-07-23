/**
 * @Project Final-Project
 * @Author Yonas
 * @Date 07/20/2022
 * @File app.js
 */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const stripe = require("./routes/stripe");

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successful"))
  .catch((err) => console.log({ Error: err }));

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/stripe", stripe);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`the server is running at port : ${port}`);
});
