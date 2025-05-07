"use server";

import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "@/types/order-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ parsedInput: { products, status, totalPrice } }) => {
    const session = await auth();

    if (!session) return { error: "You need to be logged in!" };

    const order = await db
      .insert(orders)
      .values({
        status,
        total: totalPrice,
        userID: session.user.id,
      })
      .returning();

    products.map(async ({ productId, quantity, variantId }) => {
      await db.insert(orderProduct).values({
        quantity,
        productVariantID: variantId,
        productID: productId,
        orderID: order[0].id,
      });
    });

    return { success: "Order added!" };
  });

export const updateOrderStatus = actionClient
  .schema(updateOrderStatusSchema)
  .action(async ({ parsedInput: { id, status } }) => {
    const order = await db.query.orders.findFirst({ where: eq(orders.id, id) });

    if (!order) return { error: "Order not found!" };

    await db.update(orders).set({ status }).where(eq(orders.id, id));

    revalidatePath("/dashboard/orders");
    return { success: "Order status updated!" };
  });
