const express = require("express");
const Stripe = require("stripe");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.itemsCheckOut);
  const line_items = req.body.itemsCheckOut.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.productImage],
          description: item.desc,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    // customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/store`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});
module.exports = router;
