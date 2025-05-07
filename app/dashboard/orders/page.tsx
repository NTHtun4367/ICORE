import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders } from "@/server/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Image from "next/image";
import OrderDropdown from "./order-dropdown";

const Orders = async () => {
  const session = await auth();

  if (!session?.user) return redirect("/");

  const orderArray = await db.query.orders.findMany({
    where:
      session.user.role === "admin"
        ? undefined
        : eq(orders.userID, session.user.id),
    with: {
      orderProduct: {
        with: {
          productVariants: { with: { variantImages: true } },
          product: true,
        },
      },
    },
    orderBy: [desc(orders.id)],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View your all orders and status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-center">Ordered on</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">User action</TableHead>
              {session.user.role === "admin" && (
                <TableHead className="text-right">Admin action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderArray.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell className="text-center">
                    {order.created?.toString()}
                  </TableCell>
                  <TableCell>
                    {order.status === "pending" && (
                      <span className="bg-yellow-500 p-1 rounded text-sm font-medium text-white">
                        {order.status}
                      </span>
                    )}
                    {order.status === "completed" && (
                      <span className="bg-green-500 p-1 rounded text-sm font-medium text-white">
                        {order.status}
                      </span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="bg-red-500 p-1 rounded text-sm font-medium text-white">
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger className="underline">
                        View Details
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>
                            Details of Order # {order.id}
                          </DialogTitle>
                          <DialogDescription>
                            Order's total price - {formatCurrency(order.total)}
                          </DialogDescription>
                        </DialogHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Image</TableHead>
                              <TableHead>Product</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Variant</TableHead>
                              <TableHead className="text-right">
                                Quatity
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderProduct.map(
                              ({ product, productVariants, quantity }) => (
                                <TableRow key={product.id}>
                                  <TableCell className="font-medium">
                                    <Image
                                      className="rounded-md"
                                      src={
                                        productVariants.variantImages[0]
                                          .image_url
                                      }
                                      alt={product.title}
                                      width={50}
                                      height={50}
                                    />
                                  </TableCell>
                                  <TableCell>{product.title}</TableCell>
                                  <TableCell>
                                    {formatCurrency(product.price)}
                                  </TableCell>
                                  <TableCell>
                                    <div
                                      className="w-4 h-4 rounded-full"
                                      style={{
                                        backgroundColor: productVariants.color,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {quantity}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  {session.user.role === "admin" && (
                    <TableCell className="text-right">
                      <OrderDropdown id={order.id} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Orders;
