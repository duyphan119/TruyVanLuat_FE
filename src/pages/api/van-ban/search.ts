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

      const { limit, p, kwd, tt, cq, nk, k } = req.query;
      const pageSize = limit ? +limit : 20;
      const page = p ? +p : 1;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const dayStr = (day < 10 ? "0" : "") + day;
      const monthStr = (month < 10 ? "0" : "") + month;

      const filters = ["kwd=" + (kwd || "")];

      p && +p > 1 && filters.push("p=" + p);
      tt && filters.push("tt=" + tt);
      cq && filters.push("cq=" + cq);
      nk && filters.push("nk=" + nk);
      k && filters.push("k=" + k);

      const url = `https://vanbanphapluat.co/tim-kiem?lv=giao-thong-van-tai&${filters.join(
        "&"
      )}`;
      console.log(url);

      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const vanbans: any[] = [];

      $(`.items-push`).each(function () {
        const description = $(this).find(".push-30").text();
        const aEl = $(this).find(".push-5 a");
        const tooltip = aEl.attr("title");
        const title = aEl.text();
        const slug = aEl.attr("href");
        const obj = {
          description,
          tooltip,
          title,
          issue: "",
          effectiveDate: "",
          status: "",
          updated: "",
          expiredDate: "",
          slug,
        };
        $(this)
          .find(".pull-right div")
          .each(function () {
            const text = $(this).text();
            const value = $(this).find(".pull-right").text();
            if (text.indexOf("Ban hành") !== -1) {
              obj.issue = value;
            } else if (text.indexOf("Ngày hiệu lực") !== -1) {
              obj.effectiveDate = value;
            } else if (text.indexOf("Hiệu lực") !== -1) {
              obj.status = value;
            } else if (text.indexOf("Cập nhật") !== -1) {
              obj.updated = value;
            } else if (text.indexOf("Ngày hết hiệu lực") !== -1) {
              obj.expiredDate = value;
            }
          });
        obj.title !== "" && vanbans.push(obj);
      });
      const count = +$(".text-white-op strong").text().replace(",", "");
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
