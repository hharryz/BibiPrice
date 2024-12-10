"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { PriceHistory } from "@/types/product/product";
const chartData = [
  { date: "2024-04-01", price: 10.11 },
  { date: "2024-05-02", price: 18.12 },
  { date: "2024-06-03", price: 20.2 },
  { date: "2024-07-04", price: 30.1 },
  { date: "2024-07-05", price: 40.1 },
  { date: "2024-07-06", price: 50.1 },
  { date: "2024-07-07", price: 60.1 },
  { date: "2024-07-08", price: 7.1 },
  { date: "2024-07-09", price: 8.1 },
  { date: "2024-07-10", price: 9.1 },
  { date: "2024-07-11", price: 1.1 },
  { date: "2024-07-12", price: 11.1 },
  { date: "2024-07-13", price: 12.1 },
  { date: "2024-07-14", price: 13.1 },
  { date: "2024-07-15", price: 14.1 },
  { date: "2024-07-16", price: 15.1 },
  { date: "2024-07-17", price: 16.1 },
  { date: "2024-07-18", price: 17.1 },
  { date: "2024-07-28", price: 27.1 },
  { date: "2024-07-29", price: 28.1 },
  { date: "2024-07-30", price: 29.1 },
  { date: "2024-07-31", price: 30.1 },
];

const chartConfig = {
  price: {
    label: "价格(元)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function HistoryChart({chartData}: {chartData: PriceHistory[]}) {
  const avgPrice = chartData ? chartData.reduce((acc, cur) => acc + cur.price, 0) / chartData.length : 0;

  const displayData = chartData.map((record) => {
    return {
      date: record.date
      .toISOString().split('T')[0],
      price: record.price,
    };
  }).reverse();

  console.log(chartData);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 py-2 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 w-[250px] text-sm font-bold">
          价格走势图
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-row justify-center items-center gap-1 border-t px-6 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8">
            <span className="font-semibold text-sm">均价</span>
            <span className="font-semibold text-sm leading-none">
              ¥{avgPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={displayData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("cn-ZH", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("cn-ZH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"price"} fill={`var(--color-${"price"})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
