import express from "express";
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Ml8CSSFJIURXQaEJKwTspiwgiqdzHsgfrwPYAwYElcqZ48pf0RqKqvvNhjXHDRz38nvRdje0vdSSRHvqK2yXTdJ007dAal3ud")

const router = express.Router();

router.post("/session",  async (req, res) => {

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
