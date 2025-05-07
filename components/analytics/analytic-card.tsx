import Link from "next/link";
import React from "react";
import { Card, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

type AnalyticCardProps = {
  count: number;
  title: string;
  icon: React.ReactNode;
  href: string;
};

const AnalyticCard = ({ count, title, icon, href }: AnalyticCardProps) => {
  const isPendingCard = title === "Pending Orders";

  return (
    <Link href={href}>
      <Card className={cn(isPendingCard && "bg-primary text-white")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            {icon}
            <h2 className="text-2xl font-bold">{count}+</h2>
          </div>
          <p className="text-sm lg:text-base font-medium">{title}</p>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default AnalyticCard;
