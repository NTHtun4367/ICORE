"use server";

import { paymentSchema } from "@/types/payment-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const processPayment = actionClient
  .schema(paymentSchema)
  .action(async ({ parsedInput: { amount, cart, currency } }) => {
    const user = await auth();

    if (!user)
      return {
        isLogin: { message: "You need to be logged in!", status: false },
      };
    if (!amount) return { error: "No products in cart!" };

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    return {
      success: {
        paymentIntentId: paymentIntent.id,
        clientSecretId: paymentIntent.client_secret,
        user_email: user.user.email,
      },
    };
  });
