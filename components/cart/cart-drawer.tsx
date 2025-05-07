import React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartItem from "./cart-item";
import CartStatus from "./cart-status";
import { useCartStore } from "@/store/cart-store";
import Payment from "./payment";
import Success from "./success";

type CartDrawerProps = {
  children: React.ReactNode;
};

const CartDrawer = ({ children }: CartDrawerProps) => {
  const cartPosition = useCartStore((state) => state.cartPosition);

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="lg:text-center">
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerDescription className="mb-4">Stay home. Stay safe.</DrawerDescription>
          <CartStatus />
        </DrawerHeader>
        {cartPosition === "Order" && <CartItem />}
        {cartPosition === "Checkout" && <Payment />}
        {cartPosition === "Success" && <Success />}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
