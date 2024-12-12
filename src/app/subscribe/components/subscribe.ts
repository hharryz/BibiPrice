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
    return;
  }
  await prisma.subscription.create({
    data: {
      userId: session.user.id,
      pIdentifier: identifier,
    },
  });
}

export async function removeProduct(identifier: string) {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
    return;
  }
  await prisma.subscription.deleteMany({
    where: {
      userId: session.user.id,
      pIdentifier: identifier,
    },
  });
}

export async function updateExpectedPrice(identifier: string, price: string) {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
    return;
  }
  await prisma.subscription.updateMany({
    where: {
      userId: session.user.id,
      pIdentifier: identifier,
    },
    data: {
      expectedPrice: price,
    },
  });
  console.log(
    "[Updating User Expected Price] product : ",
    identifier,
    " user id: ",
    session.user.id,
    " expected price: ",
    price
  );
}

export async function getExpectedPrice(identifier: string) {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
    return;
  }
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      pIdentifier: identifier,
    },
    select: {
      expectedPrice: true,
    },
  });
  return subscription?.expectedPrice;
}

export async function updateSubscription() {
  const session = await auth();
  if (session === null || session?.user?.id === undefined) {
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
        } else {
          return; //  omit other platforms
        }
        console.log(
          "[Querying and Updating Product Price] product :",
          sub.pIdentifier,
          " price: ",
          nowPrice
        );
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
      console.log("[Find Alerts, Sending Email to User] Alerts are :", alerts);
      //  send email to user
      sendSubscription({
        to: session.user?.email ? session.user.email : "",
        alerts,
      });
    }
  };

  setInterval(async () => {
    console.log(
      "[Round-Robin Update Routine for User Subscriptions] at",
      new Date()
    );
    updatePrice();
  }, 1000 * 60 * 60 * 24); //  round-robin update every 24 hours

  updatePrice();
}
