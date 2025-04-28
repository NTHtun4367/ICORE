import DashboardNavigation from "@/components/navigation/dashboard-nav";
import { auth } from "@/server/auth";
import {
  ChartNoAxesCombined,
  Package,
  PackagePlus,
  Settings,
  Truck,
} from "lucide-react";
import React from "react";

const publicRoutes = [
  {
    label: "Orders",
    path: "/dashboard/orders",
    icons: <Truck size={18} />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icons: <Settings size={18} />,
  },
];

const privateRoutes = [
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icons: <ChartNoAxesCombined size={18} />,
  },
  {
    label: "Create Product",
    path: "/dashboard/create-product",
    icons: <PackagePlus size={18} />,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icons: <Package size={18} />,
  },
];

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const routes =
    session?.user.role === "admin"
      ? [...privateRoutes, ...publicRoutes]
      : publicRoutes;
  return (
    <>
      <DashboardNavigation routes={routes} />
      <section>{children}</section>
    </>
  );
};

export default Layout;
