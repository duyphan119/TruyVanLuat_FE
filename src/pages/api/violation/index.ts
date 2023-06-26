import dbConnect from "@/config/db";
import VanBan from "@/models/VanBan";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    if (req.method === "GET") {
      try {
        const { p, q, id } = req.query;

        if (id) {
        }

        // const url = `https://vietnamnet.vn/tim-kiem-p${
        //   p ? +p - 1 : 0
        // }?bydaterang=all&cate=00000P&newstype=all&od=2&q=${q || ""}`;
        const url = `https://thuvienphapluat.vn/iThong/tra-cuu-xu-phat-giao-thong.aspx?k=${
          q || ""
        }&type=0&group=0&page=${p || 1}`;
        console.log(url);

        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        const rows: any[] = [];

        $(".tbViolation tbody tr").each(function () {
          const violationObject = $(this)
            .find(".ViolationObject")
            .text()
            .trim();
          const violationName = $(this).find(".ViolationName").text().trim();
          const violationFines = $(this).find(".ViolationFines").text().trim();
          const slug = $(this).find(".ViolationDetail a").attr("href");

          const row = {
            violator: violationObject,
            name: violationName,
            fine: violationFines,
            id: slug?.split("id=")[1],
          };
          rows.push(row);
        });
        const count = +$("#Content_ctl00_lbTotal").text();

        res.status(200).json({
          rows,
          isNext: Math.ceil(count / 20) > +(p || 1),
          count,
        });
      } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Error" });
      }
    }
  }
}
