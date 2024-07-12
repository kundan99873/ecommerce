import asyncHandler from "../middleware/asyncHandler.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const payment = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});
