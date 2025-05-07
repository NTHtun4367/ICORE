import * as z from "zod";

export const createOrderSchema = z.object({
  totalPrice: z.number(),
  status: z.enum(["pending", "completed", "cancelled"]),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
      variantId: z.number(),
    })
  ),
});

export const updateOrderStatusSchema = z.object({
  id: z.number(),
  status: z.enum(["pending", "completed", "cancelled"]),
});
