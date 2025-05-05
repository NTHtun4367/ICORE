"use client";

import { useCartStore } from "@/store/cart-store";
import CartDrawer from "./cart-drawer";
import { ShoppingCart } from "lucide-react";

const CartBtn = () => {
  const cartLength = useCartStore((state) => state.cart.length);

  return (
    <CartDrawer>
      <div className="relative">
        <ShoppingCart strokeWidth={"3"} />
        <span className="absolute top-[-8px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-primary rounded-full">
          {cartLength}
        </span>
      </div>
    </CartDrawer>
  );
};

export default CartBtn;
