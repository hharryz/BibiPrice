import { ProductArtwork } from "@/components/product-artwork";
import getProducts from "./components/get-product";
import { auth } from "@/auth";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Product } from "@/types/product/product";

export default async function ComparePrice({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  if (session === null) {
    return (
      <div>
        请先注册，跳转链接：<Link href="/user/sign">点此跳转</Link>
      </div>
    );
  }
  let products = [] as Product[];
  if (session !== null) {
    products = await getProducts(params.slug);
  }

  return (
    <div className="">
      <div className="flex flex-col items-start justify-center gap-4 rounded-lg ml-8 mt-8">
        {products?.map((product) => {
          return <ProductArtwork key={product.identifier} product={product} />;
        })}
      </div>
      <div className="hidden xl:block fixed right-4 top-24">
        <Card>
          <CardHeader>
            <CardTitle>筛选商品</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="dd" defaultChecked>当当</ToggleGroupItem>
              <ToggleGroupItem value="jd" defaultChecked>京东</ToggleGroupItem>
              <ToggleGroupItem value="kfz" defaultChecked>孔夫子</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single">
              <ToggleGroupItem value="asc">升序</ToggleGroupItem>
              <ToggleGroupItem value="desc">降序</ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
