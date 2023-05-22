import News from "@/types/news/News";
import PaginationResponse from "@/types/response/PaginationResponse";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const baseUrl = "https://vnexpress.net";
      const url = `${baseUrl}/thoi-su/giao-thong`;
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
      const data: News[] = [];
      const limit = req.query.limit || 5;

      if (data.length < limit) {
        const title = $(".article-topstory .title-news a").attr("title");
        const slug = $(".article-topstory .title-news a")
          .attr("href")
          ?.split(`${baseUrl}/`)[1];
        const thumbnail = $(".article-topstory .thumb-art picture img").attr(
          "src"
        );
        const description = $(".article-topstory .description a").text().trim();
        data.push({
          title,
          description,
          thumbnail,
          slug,
        });
      }
      $(".list-news-subfolder .item-news").each(function () {
        if (data.length < limit) {
          const title = $(this).find(".title-news a").attr("title");
          const slug = $(this)
            .find(".title-news a")
            .attr("href")
            ?.split(`${baseUrl}/`)[1];
          const thumbnail = $(this).find(".thumb-art picture img").attr("src");
          const description = $(this).find(".description a").text().trim();
          data.push({
            title,
            description,
            thumbnail,
            slug,
          });
        }
      });

      res.status(200).json(data);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
