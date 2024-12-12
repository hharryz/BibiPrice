"use server"

import * as cheerio from "cheerio";
import { filterSpace, userAgent, extractIdentifier } from "./utils";

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

  const data = $(".con.shoplist ul.bigimg li:lt(10)")
    .map((i, el) => {
      const url = `https:${$(el).find(".name a").attr("href")}`;
      return {
        name: `${filterSpace($(el).find(".name a").text())}`,
        price: `${filterSpace(
          $(el).find(".price .search_now_price").text().replace(/^¥/, "")
        )}`,
        shop: `${filterSpace($(el).find(".search_shangjia a").text())}`,
        description: `${filterSpace($(el).find(".detail").text())}`,
        image: `https:${
          $(el).find("a.pic img").attr("data-original") === undefined
            ? $(el).find("a.pic img").attr("src")
            : $(el).find("a.pic img").attr("data-original")
        }`,
        url: url,
        platform: "当当",
        identifier: extractIdentifier(url, "dd"),
        category: [],
      };
    })
    .get();

  return data;
}

export async function detailDangdang(pId: string) {
  const $ = await cheerio.fromURL(
    `https://product.dangdang.com/${pId}.html`,
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
  const price = $("#dd-price").text().trim().replace(/^¥/, "")
  console.log("[Searching Detail Price in DangDang], pid : ", pId, " price : ", price)
  return price
}
