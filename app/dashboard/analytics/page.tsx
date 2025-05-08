import AnalyticCard from "@/components/analytics/analytic-card";
import AnalyticChart from "@/components/analytics/analytic-chart";
import { analytics, weeklyAnalytics } from "@/server/actions/analytics";
import { auth } from "@/server/auth";
import { Box, Clock, Package, Users } from "lucide-react";
import { redirect } from "next/navigation";

const Analytics = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") return redirect("/");

  const analyticsData = await analytics();
  const weeklyAnalyticsData = await weeklyAnalytics();

  return (
    <main className="mb-8">
      {analyticsData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4">
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
        </div>
      )}
      <AnalyticChart data={weeklyAnalyticsData!} />
    </main>
  );
};

export default Analytics;
