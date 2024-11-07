import * as cheerio from "cheerio";
import { filterSpace, userAgent } from "./utils";

export async function searchJD(name: string) {
  const $ = await cheerio.fromURL(
    `https://search.jd.com/Search?keyword=${name}&enc=utf-8`,
    {
      requestOptions: {
        method: "GET",
        headers: {
          "User-Agent": userAgent,
          Cookie: process.env.JD_COOKIE,
        },
      },
    }
  );

  const data = $("#J_goodsList li:lt(10)")
    .map((i, el) => {
      return {
        name: filterSpace($(el).find(".p-name em").text()),
        price: filterSpace($(el).find(".p-price i").text()),
        shop: filterSpace($(el).find(".curr-shop.hd-shopname").text()),
        description: filterSpace($(el).find(".p-name .promo-words").text()),
        image: `https:${$(el).find(".p-img img").attr("data-lazy-img")}`,
        url: `https:${$(el).find(".p-name a").attr("href")}`,
        platform: "jd",
        barcode: "",
        category: [],
      };
    })
    .get();

  return data;
}
