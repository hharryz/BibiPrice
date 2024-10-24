import { cn } from "@/lib/utils";
import Image from "next/image";
import { Product } from "@/types/product/product";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HistoryChart } from "./history-chart";

interface ProductArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ProductArtwork({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProductArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Card className="w-96">
        <CardContent>
          <div className="overflow-hidden rounded-md">
            <Image
              src={product.image}
              alt={product.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
          <div className="space-y-1 text-sm">
            <h3 className="font-medium leading-none">{product.name}</h3>
            <p className="text-xs text-muted-foreground">
              {product.description}
            </p>
            <HoverPriceHistory />
          </div>
        </CardContent>
      </Card>
      <div className="w-80"><HistoryChart /></div>
    </div>
  );
}

const HoverPriceHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistoryPrice = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data"); // 假设这是你的后端 API
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open && !data) {
      fetchHistoryPrice(); // Only fetch data if it's not already loaded
    }
  };

  return (
    <HoverCard onOpenChange={handleOpenChange}>
    <HoverCardTrigger asChild>
      <BarChart className="h-4 w-4 opacity-70" />
      
    </HoverCardTrigger>
    <HoverCardContent className="w-100">
      {loading? (
        <p>Loading...</p>
      ) : data? (
        <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
      ) : (
        <div>
          <p>No data available</p>
        </div>
      )}
      <div>111</div>
    </HoverCardContent>
  </HoverCard>
  )
}