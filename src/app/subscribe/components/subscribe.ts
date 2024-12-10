"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { detailDangdang } from "@/lib/crawler/dd";
import type { Product } from "@/types/product/product";

export async function addProduct(identifier: string) {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
    console.log("请先注册，跳转链接：<Link href='/user/sign'>点此跳转</Link>");
    return;
  }
  await prisma.subscription.create({
    data: {
      userId: session.user.id,
      pIdentifier: identifier,
    },
  });
  console.log("add product", session.user.id, identifier);
}

export async function removeProduct(identifier: string) {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
    console.log("请先注册，跳转链接：<Link href='/user/sign'>点此跳转</Link>");
    return;
  }
  await prisma.subscription.deleteMany({
    where: {
      userId: session.user.id,
      pIdentifier: identifier,
    },
  });
  console.log("remove product", session.user.id, identifier);
}

export async function updateSubscription() {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
    console.log("请先注册，跳转链接：<Link href='/user/sign'>点此跳转</Link>");
    return;
  }

  let alerts: Product[] = [];

  const updatePrice = async () => {
    //  get all subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: session.user?.id,
      },
      select: {
        pIdentifier: true,
        expectedPrice: true,
      },
    });

    //  to avoid API query limit, we only update the price of subscriptions
    subscriptions.forEach(async (sub) => {
      const nowPrice = sub.pIdentifier.startsWith("dd")
        ? await detailDangdang(sub.pIdentifier.replace("dd", ""))
        : "0";
      console.log("update subscription", sub.pIdentifier, nowPrice);
      await prisma.priceHistory.create({
        data: {
          price: nowPrice,
          pIdentifier: sub.pIdentifier,
        },
      });

      await prisma.product.update({
        where: {
          identifier: sub.pIdentifier,
        },
        data: {
          price: nowPrice,
        },
      });

      if (sub.expectedPrice && nowPrice <= sub.expectedPrice) {
        const product = await prisma.product.findUnique({
          where: {
            identifier: sub.pIdentifier,
          },
        });
        if (product) {
          alerts.push(product);
        }
      }

    });

    if (alerts.length > 0) {
      console.log("alerts", alerts);
    }
  };

  setInterval(async () => {
    console.log("update subscription");
    updatePrice();
  }, 1000 * 60 * 60 * 24);  //  round-robin update every 24 hours

  updatePrice();
}
