"use server";

import { userAgent,  } from "./utils";
import * as cheerio from "cheerio";

export async function searchKongfuzi(name: string) {
  const url = `https://search.kongfz.com/pc-gw/search-web/client/pc/product/keyword/list?dataType=0&keyword=${name}&page=1&userArea=1001000000`;

  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Cookie: process.env.KFZ_COOKIE || "",
    }),
  }).then((res) => res.json());

  const products = res.data.itemResponse.list.map((item: any) => {
    return {
      name: item.title,
      price: `${item.price}`,
      shop: item.shopName,
      description: item.importantDesc,
      image: item.imgUrl,
      url: item.link.pc,
      platform: "孔夫子旧书网",
      identifier: "kfz" + item.link.pc.match(/\/\d+\/\d+$/)[0].substring(1),
      category: [],
    };
  });

  return products.slice(0, 10);
}

export async function detailKongfuzi(pId: string) { 
  const $ = await cheerio.fromURL(
    `https://book.kongfz.com/${pId}`,
    {
      requestOptions: {
        method: "GET",
        headers: {
          "User-Agent": userAgent,
          Cookie: process.env.KFZ_COOKIE,
        },
      },
    }
  )

  const price = $(".now-price-text").text().trim()
  console.log("[Searching Detail Price in KongFuZi], pid : ", pId, " price : ", price)
  return price
}
