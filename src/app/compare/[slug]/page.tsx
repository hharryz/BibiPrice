"use client";

import { ProductArtwork } from "./components/product-artwork";

export default function ComparePrice({params} : {params : {slug : string}}) {

  return (
    <div>
      <h1>Compare Price</h1>
      
      <div>{decodeURIComponent(params.slug)}</div>
      <ProductArtwork 
        product={{
          name: "Next.js",
          description: "The React Framework – created and maintained by @vercel.",
          image: "https://github.com/vercel.png",
          id: "1",
          price: 0,
          platform: "web",
          barcode: "123456",
          category: "framework",
          url: "https://nextjs.org/",
          createdAt: "2021-12-01",
          updatedAt: "2021-12-01",
        }}
        aspectRatio="square"
        width={200}
        height={200}
      />

    </div>
  );
}
