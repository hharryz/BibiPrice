import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ProductArtwork } from "@/components/product-artwork";
import type { Product } from "@/types/product/product";
import { updateSubscription } from "./components/subscribe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpectInput from "./components/expect-price";
import { getExpectedPrice } from "./components/subscribe";

export default async function Subscribe() {
  const session = await auth();
  if (session === null) {
    return (
      <div>
        请先注册，跳转链接：<Link href="/user/sign">点此跳转</Link>
      </div>
    );
  }

  await updateSubscription();

  const subcriptions = await prisma.subscription.findMany({
    where: {
      userId: session.user?.id,
    },
  });

  console.log("[Getting Subscriptions], subscriptions info: ", subcriptions);

  const products: Product[] = await prisma.product
    .findMany({
      where: {
        identifier: {
          in: subcriptions.map((sub) => sub.pIdentifier),
        },
      },
    })
    .then((products) => {
      return products.map((product) => {
        return {
          name: product.name,
          price: product.price,
          shop: product.shop,
          description: product.description ? product.description : "",
          image: product.image,
          url: product.url,
          platform: product.platform,
          identifier: product.identifier,
          category: product.category,
        };
      });
    });

  return (
    <div className="flex flex-col items-start justify-center gap-4 rounded-lg ml-8 mt-8">
      {products?.map(async (product) => {
        const price = await getExpectedPrice(product.identifier);
        return (
          <div
            className="flex flex-row items-center justify-center gap-4"
            key={product.identifier}
          >
            {" "}
            <ProductArtwork product={product} isSubscribed={true} />
            <Card>
              <CardHeader>
                <CardTitle>预期价格</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpectInput product={product} expectPrice={price} />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
