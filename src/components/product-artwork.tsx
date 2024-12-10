"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { PriceHistory, Product } from "@/types/product/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Store, ChartSpline } from "lucide-react";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HistoryChart } from "./history-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {addProduct, removeProduct} from "@/app/subscribe/components/subscribe";

import getHistory from "@/app/compare/[slug]/components/get-history";

interface HoverPriceHistoryProps {
  pId: string;
}

interface ProductArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  isSubscribed?: boolean;
}

export function ProductArtwork({
  product,
  isSubscribed,
  className,
  ...props
}: ProductArtworkProps) {
  return (
    <div className={cn("space-y-3 w-full", className)} {...props}>
      <Card className="w-[35rem] lg:w-[55rem] xl:w-[65rem]">
        <div className="rounded-md flex flex-row gap-6 m-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className={cn(
              "object-cover transition-all hover:scale-[1.01] aspect-[3/4]"
            )}
          />
          <div className="w-[15rem] space-y-2 h-full flex flex-col mt-2 xl:w-[45rem] lg:w-[35rem]">
            <Link
              href={product.url}
              className="font-medium leading-none text-base truncate"
            >
              {product.name}
            </Link>
            <div className="flex flex-row text-red-500 font-semibold text-xl">
              <p>¥</p>
              {product.price}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex flex-row gap-2 items-center">
              <Store className="h-4 w-4" />
              <div className="font-bold text-base">{product.shop}</div>
              <Badge className="bg-red-600 hover:bg-red-500">
                {product.platform}
              </Badge>
            </div>
            <div className="pt-4 gap-4 flex flex-row ">
              <Button className="gap-2 h-8" 
              onClick={() => {
                if (isSubscribed) {
                  removeProduct(product.identifier);
                } else {
                  addProduct(product.identifier);
                }
              }}
              >
                <Star className="h-4 w-4" />
                {isSubscribed ? "取消订阅" : "订阅"}
              </Button>
              <HoverPriceHistory pId={product.identifier} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

const HoverPriceHistory = ({ pId }: HoverPriceHistoryProps) => {
  const [data, setData] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistoryPrice = async () => {
    setLoading(true);
    try {
      const res = await getHistory(pId); // 假设这是你的后端 API
      console.log(res);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      console.log("finally");
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log("open", open);
    console.log("data", data);
    if (open && data.length === 0) {
      fetchHistoryPrice(); // Only fetch data if it's not already loaded
      console.log("fetching data");
    }
  };

  return (
    <HoverCard onOpenChange={handleOpenChange}>
      <HoverCardTrigger asChild>
        <Button className="gap-2 h-8">
          <ChartSpline className="h-4 w-4" />
          查看价格走势
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-100 border-none">
        {loading ? (
          <p>正在加载...</p>
        ) : data.length == 0 ? (
          <p>暂无价格走势</p>
          
        ) : (
          <HistoryChart chartData={data}/>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
