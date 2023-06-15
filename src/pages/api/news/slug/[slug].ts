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
      const url = `https://vietnamnet.vn/${slug}`;
      // const baseUrl = "https://vnexpress.net";
      // const url = `${baseUrl}/${slug}`;
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const title = $(".content-detail-title").text();
      const createdAt = $(".bread-crumb-detail__time").text();
      const description = $(".content-detail-sapo").text();
      const content = $("#maincontent").html();
      // const paragraphs: any[] = [];
      // $(".sidebar-1 .fck_detail")
      //   .find("figure")
      //   .each(function () {
      //     const src = $(this).find("picture img").attr("data-src");
      //     const description = $(this).find("figcaption .Image").text().trim();
      //     paragraphs.push({
      //       src,
      //       type: "image",
      //       description,
      //       index: $(this).index(),
      //     });
      //   });

      // $(".sidebar-1 .fck_detail .Normal").each(function () {
      //   const text = $(this).text().trim();
      //   paragraphs.push({ type: "text", text, index: $(this).index() });
      // });

      // paragraphs.sort((a, b) => a.index - b.index);

      res.status(200).json({
        title,
        createdAt,
        description,
        content,
      });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
