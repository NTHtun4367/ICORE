"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Data = {
  day: string;
  count: number;
};

type AnalyticChartProps = {
  data: Data[];
};

const AnalyticChart = ({ data }: AnalyticChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Chart</CardTitle>
        <CardDescription>
          {data[0].day} / {data[data.length - 1].day}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-96 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              bottom: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="black"
              strokeWidth={2}
              dot={{
                fill: "white",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticChart;
