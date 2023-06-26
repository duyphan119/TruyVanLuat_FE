import dbConnect from "@/config/db";
import VanBan from "@/models/VanBan";
import PaginationResponse from "@/types/response/PaginationResponse";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginationResponse<VanBanCrawled> | any>
) {
  if (req.method === "GET") {
    try {
      const date = new Date();

      const { limit, p, type, signer, org, kwd } = req.query;
      const pageSize = limit ? +limit : 20;
      const page = p ? +p : 1;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const dayStr = (day < 10 ? "0" : "") + day;
      const monthStr = (month < 10 ? "0" : "") + month;

      const url = `https://thuvienphapluat.vn/page/tim-van-ban.aspx?keyword=${
        kwd || ""
      }&area=1&type=${type || 0}&status=0&lan=1&org=${org || 0}&signer=${
        signer || 0
      }&match=False&sort=2&bdate=22/05/1943&&edate=${dayStr}/${monthStr}/${year}&page=${page}`;

      console.log(url);

      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const vanbans: any[] = [];

      $(`div[class^="content-"]`).each(function () {
        if (vanbans.length < pageSize) {
          const aEl = $(this).find(".nqTitle a");
          const title = aEl.text();
          const href = aEl.attr("href");
          let slug = "";
          if (href) {
            const splitHref = href.split("/van-ban/");
            if (splitHref.length > 0) {
              slug = splitHref[splitHref.length - 1];
            }
          }
          let issue = "";
          let updated = "";
          $(this)
            .find(".right-col p")
            .each(function () {
              const text = $(this).text().trim();
              if (text.indexOf("Ban hành") !== -1) {
                const splitText = text.split(" ");
                issue = splitText[splitText.length - 1];
              }
              if (text.indexOf("Cập nhật") !== -1) {
                const splitText = text.split(" ");
                updated = splitText[splitText.length - 1];
              }
            });
          // if ($(this).find(".nqContent").text() !== "") {
          vanbans.push({ title, slug, issue, updated });
          // }
        }
      });
      const count = +$("#lbTotal").text();
      res.status(200).json({
        rows: vanbans,
        count,
        total_pages: Math.ceil(count / pageSize),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    }
  }
}
