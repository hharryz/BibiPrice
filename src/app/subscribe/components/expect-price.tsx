"use client";

import type { Product } from "@/types/product/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { updateExpectedPrice } from "./subscribe";
import { toast } from "sonner";

export default function ExpectInput({
  product,
  expectPrice,
}: {
  product: Product;
  expectPrice: string | null | undefined;
}) {
  const [price, setPrice] = useState<number | null>(
    expectPrice ? parseFloat(expectPrice) : null
  );

  return (
    <form
      className="flex flex-row gap-2"
      action={async () => {
        if (price !== null)
          await updateExpectedPrice(product.identifier, price.toString());
        toast("更新成功", {
          description: "降价到您的预期价格，我们会邮件通知您",
        });
      }}
    >
      <Input
        className="w-40"
        type="number"
        placeholder="预期价格..."
        name="price"
        value={price ? price.toString() : ""}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <Button type="submit">更新</Button>
    </form>
  );
}
