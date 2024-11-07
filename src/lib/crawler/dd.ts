import * as cheerio from "cheerio";
import { filterSpace, userAgent } from "./utils";

export async function searchDangDang(name: string) {
  const $ = await cheerio.fromURL(
    `https://search.dangdang.com/?key=${name}&act=input`,
    {
      requestOptions: {
        method: "GET",
        headers: {
          "User-Agent": userAgent,
          Cookie: process.env.DD_COOKIE,
        },
      },
    }
  );

  const data = $(".con.shoplist ul.bigimg li:lt(10)").map((i, el) => {
    return {
      name: filterSpace($(el).find(".name a").text()),
      price: filterSpace($(el).find(".price .search_now_price").text()),
      shop: filterSpace($(el).find(".search_shangjia a").text()),
      description: filterSpace($(el).find(".detail").text()),
      image: `https:${$(el).find("a.pic img").attr("data-original")}`,
      url: `https:${$(el).find(".name a").attr("href")}`,
      platform: "dd",
      barcode: "",
      category: [],
    };
  }).get();

  return data;
}
