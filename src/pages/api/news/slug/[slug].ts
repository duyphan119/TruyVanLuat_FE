import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const slug = req.query.slug;
      const baseUrl = "https://vnexpress.net";
      const url = `${baseUrl}/${slug}`;
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const title = $(".sidebar-1 .title-detail").text();
      const createdAt = $(".sidebar-1 .date").text();
      const description = $(".sidebar-1 .description").text();
      const paragraphs: any[] = [];
      $(".sidebar-1 .fck_detail")
        .find("figure")
        .each(function () {
          const src = $(this).find("picture img").attr("data-src");
          const description = $(this).find("figcaption .Image").text().trim();
          paragraphs.push({
            src,
            type: "image",
            description,
            index: $(this).index(),
          });
        });

      $(".sidebar-1 .fck_detail .Normal").each(function () {
        const text = $(this).text().trim();
        paragraphs.push({ type: "text", text, index: $(this).index() });
      });

      paragraphs.sort((a, b) => a.index - b.index);

      res.status(200).json({
        title,
        createdAt,
        description,
        paragraphs,
      });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
