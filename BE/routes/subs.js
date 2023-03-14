import express from "express";
// import User from "../models/user.js";
// import { checkAuth } from "../middleware/checkAuth.js";
// import { stripe } from "../utils/stripe.js";
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Ml3wzSDBdFF0CAL50Uyq52YJ0Fkv1M6v9XFLIz5Lybo08fOwkO6Ro30retFnHRC5FHURB6vKhceszmu0eyaEOsr00M9T0qOp8")

const router = express.Router();

// router.get("/prices", checkAuth, async (req, res) => {
//   const prices = await stripe.prices.list({
//     apiKey: process.env.STRIPE_SECRET_KEY,
//   });

//   return res.json(prices);
// });

router.post("/session",  async (req, res) => {
  // const user = await Us.findOne({ email: req.user });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1Ml7ZASDBdFF0CALvTpRScUk",
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/",
      customer: "cus_NW6E0Jpy04xIlZ",
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.json(session);
});

export default router;
