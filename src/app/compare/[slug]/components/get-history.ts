"use server";

import prisma from "@/lib/prisma";
import { PriceHistory } from "@/types/product/product";
import { date } from "zod";

export default async function getHistory(pId: string) {
  const priceHistory = await prisma.priceHistory.findMany({
    where: {
      pIdentifier: pId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  //  filter the price history to only include records that are at least 1 day apart
  const filteredHistory : PriceHistory[] = priceHistory
    .filter((record, index, array) => {
      if (index === 0) return true;
      const previousRecord = array[index - 1];
      const currentDate = new Date(record.createdAt);
      const previousDate = new Date(previousRecord.createdAt);
      const timeDifference = previousDate.getTime() - currentDate.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      return dayDifference >= 1;
    })
    .map((record) => {
      return {
        date: new Date(record.createdAt),
        price: parseFloat(record.price),
      };
    });

  return filteredHistory;
}
