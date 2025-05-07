import AnalyticCard from "@/components/analytics/analytic-card";
import { analytics } from "@/server/actions/analytics";
import { Box, Clock, Package, Users } from "lucide-react";

const Analytics = async () => {
  const analyticsData = await analytics();
  console.log(analyticsData);

  return (
    <main className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
      {analyticsData && (
        <>
          <AnalyticCard
            title="Pending Orders"
            count={analyticsData.pendingOrders}
            icon={<Clock />}
            href="/dashobard/orders"
          />
          <AnalyticCard
            title="Completed Orders"
            count={analyticsData.completedOrders}
            icon={<Package />}
            href="/dashboard/orders"
          />
          <AnalyticCard
            title="Total Customers"
            count={analyticsData.totalUsers}
            icon={<Users />}
            href="/"
          />
          <AnalyticCard
            title="Total Products"
            count={analyticsData.productCount}
            icon={<Box />}
            href="/dashboard/products"
          />
        </>
      )}
    </main>
  );
};

export default Analytics;
