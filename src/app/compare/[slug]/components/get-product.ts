import prisma from "@/lib/prisma";
import type { Product } from "@/types/product/product";
import { searchDangDang } from "@/lib/crawler/dd";
import { searchJD } from "@/lib/crawler/jd";
import { searchKongfuzi } from "@/lib/crawler/kfz";

export default async function getProducts(name: string) {
  const DDProducts = await searchDangDang(name);
  const JDProducts = await searchJD(name);
  const KFZProducts = await searchKongfuzi(name);

  const products: Product[] = DDProducts.concat(JDProducts).concat(KFZProducts);

  await prisma.$transaction(
    products.map((product) =>
      prisma.product.upsert({
        where: { identifier: product.identifier },
        update: {
          price: product.price,
        },
        create: product,
      })
    )
  );

  await prisma.priceHistory.createMany({
    data: products.map((product) => ({
      price: product.price,
      pIdentifier: product.identifier,
    })),
  });

  return products;
}
