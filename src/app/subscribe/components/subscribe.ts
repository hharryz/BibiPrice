"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { detailDangdang } from "@/lib/crawler/dd";
import { detailKongfuzi } from "@/lib/crawler/kfz";
import type { Product } from "@/types/product/product";
import { sendSubscription } from "@/lib/mail";

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

  const updatePrice = async () => {
    const alerts: Product[] = [];
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
    await Promise.all(
      subscriptions.map(async (sub) => {
        let nowPrice: string = "";
        if (sub.pIdentifier.startsWith("dd")) {
          nowPrice = await detailDangdang(sub.pIdentifier.replace("dd", ""));
        } else if (sub.pIdentifier.startsWith("kfz")) {
          nowPrice = await detailKongfuzi(sub.pIdentifier.replace("kfz", ""));
        }
        console.log("update subscription", sub.pIdentifier, nowPrice);
        await prisma.priceHistory.create({
          data: {
            price: nowPrice,
            pIdentifier: sub.pIdentifier,
          },
        });

        if (
          sub.expectedPrice &&
          parseFloat(nowPrice) <= parseFloat(sub.expectedPrice)
        ) {
          const product = await prisma.product.findUnique({
            where: {
              identifier: sub.pIdentifier,
            },
          });
          if (product) {
            alerts.push(product);
          }
        }

        await prisma.product.update({
          where: {
            identifier: sub.pIdentifier,
          },
          data: {
            price: nowPrice,
          },
        });
      })
    );

    if (alerts.length > 0) {
      console.log("alerts", alerts);
      //  send email to user
      sendSubscription({
        to: session.user?.email ? session.user.email : "",
        alerts,
      });
    }
  };

  setInterval(async () => {
    console.log("update subscription");
    updatePrice();
  }, 1000 * 60 * 60 * 24); //  round-robin update every 24 hours

  updatePrice();
}
