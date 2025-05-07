"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { processPayment } from "@/server/actions/payment";
import { useCartStore } from "@/store/cart-store";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/server/actions/order";
import { toast } from "sonner";

type PaymentFormProps = {
  totalPrice: number;
};

const PaymentForm = ({ totalPrice }: PaymentFormProps) => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { execute } = useAction(createOrder, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data.error)
      } else if (data?.success) {
        toast.success(data.success)
        setCartPosition("Success");
      }
    },
  });

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      setErrorMsg(submitError.message || "Something went wrong!");
      return;
    }

    const response = await processPayment({
      amount: totalPrice * 100,
      currency: "usd",
      cart: cart.map((citem) => ({
        title: citem.name,
        price: Number(citem.price),
        image: citem.image,
        productId: citem.id,
        quantity: citem.variant.quantity,
      })),
    });

    if (response?.data?.error) {
      setErrorMsg(response.data.error);
      setLoading(false);
      return;
    }

    if (response?.data?.success) {
      const paymentRespose = await stripe.confirmPayment({
        elements,
        clientSecret: response.data.success.clientSecretId!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: response.data.success.user_email!,
        },
      });

      if (paymentRespose.error) {
        setErrorMsg(paymentRespose.error.message!);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        execute({
          status: "pending",
          totalPrice,
          products: cart.map((citem) => ({
            productId: citem.id,
            quantity: citem.variant.quantity,
            variantId: citem.variant.variantId,
          })),
        });
      }
    }
  };

  return (
    <main className="max-w-4xl mx-auto">
      <form onSubmit={onSubmitHandler}>
        <PaymentElement />
        <Button
          className="w-full my-4"
          disabled={loading || !stripe || !elements}
        >
          Pay
        </Button>
      </form>
    </main>
  );
};

export default PaymentForm;
