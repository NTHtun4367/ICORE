import { PartyPopper } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";

const Success = () => {
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const cartPosition = useCartStore((state) => state.cartPosition);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setTimeout(() => {
      setCartPosition("Order");
      clearCart();
    }, 3000);

    if (cartPosition === "Success" && cart.length === 0) {
      setCartPosition("Order");
    }

    if (cartPosition !== "Checkout" && cart.length === 0) {
      setCartPosition("Order");
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto my-10 text-center">
      <PartyPopper size={50} className="mx-auto animate-bounce" />
      <h2 className="text-4xl font-bold my-4">Your payment was successful.</h2>
      <p className="text-base font-medium text-muted-foreground mb-4">
        Thank you for your purchase
      </p>
      <Button className="mx-auto" asChild>
        <Link href={"/dashboard/orders"}>View orders</Link>
      </Button>
    </main>
  );
};

export default Success;
