const express = require("express");
const Stripe = require("stripe");
const UserTransactions = require("../model/UserTransactions");
const userTransactions = require("../model/UserTransactions");

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
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    // customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    // success_url: await (function () {
    //   const transObj = [];
    //   req.body.itemsCheckOut.map(({ _id, price, quantity }) =>
    //     transObj.push({ _id, price, quantity, date: new Date() })
    //   );
    //   const newTrans = new UserTransactions();
    //   newTrans._id = "";

    //   console.log(transObj);
    //   return `${process.env.CLIENT_URL}/checkout-success`;
    // })(),
    cancel_url: `${process.env.CLIENT_URL}/store`,
  });

  console.log(session.url);
  // res.redirect(303, session.url);
  res.send({ url: session.url });
});
module.exports = router;
