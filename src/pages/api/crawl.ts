import dbConnect from "@/config/db";
import VanBan from "@/models/VanBan";
import Dieu from "@/types/dieu/Dieu";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const url = req.body.url;
    try {
      await dbConnect();
      await VanBan.deleteOne({ href: url });
      let vanBan = await VanBan.findOne({ href: url });
      let content: string | null = "";
      if (!vanBan) {
        const dieus: Dieu[] = [];
        const { data: html } = await axios.get(url);
        let vanban_code: string = "";
        let type: string = "";
        let name: string = "";
        const $ = cheerio.load(html);
        $(".content1 p").each(function () {
          const title = $(this).text().trim();
          if (title.startsWith("Số:") && title.endsWith("NĐ-CP")) {
            vanban_code = title.split("Số: ")[1] || "100/2019/NĐ-CP";
          }
          const code = $(this).find("a").attr("name");
          if (code === "loai_1" && type === "") {
            type = title;
          }
          if (code === "loai_1_name" && name === "") {
            name = title;
          }
          $(this).attr("id", code);
          if (code && code.startsWith("dieu_") && title.includes("Điều")) {
            dieus.push({
              title,
              code,
              khoans: [],
            });
          } else if (code && code.startsWith("khoan_")) {
            dieus[dieus.length - 1].khoans.push({
              title,
              code,
              diems: [],
            });
          } else if (code && code.startsWith("diem_")) {
            const dieu_cuoi = dieus[dieus.length - 1];
            if (dieu_cuoi) {
              const khoan_cuoi = dieu_cuoi.khoans[dieu_cuoi.khoans.length - 1];
              if (khoan_cuoi) {
                khoan_cuoi.diems.push({
                  title,
                  code,
                });
              }
            }
          }
        });
        $(".content1 a").each(function () {
          $(this).removeAttr("onmouseover");
          $(this).removeAttr("onclick");
          $(this).removeAttr("onmouseout");
        });
        content = $(".content1").html();

        vanBan = await VanBan.create({
          short_code: vanban_code.split("/")[0],
          dieus,
          href: url,
          code: vanban_code,
          html: content,
          type,
          title: name,
        });
      }

      res.status(200).json(vanBan);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  } else if (req.method === "GET") {
    try {
      const baseUrl = "https://www.baogiaothong.vn";
      const url = `${baseUrl}/luat-giao-thong-duong-bo-2019-channel362`;
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
      const data: any[] = [];
      $(".boxTop article").each(function () {
        const src = $(this).find(".img img").attr("data-original");
        const a = $(this).find(".name");

        const text = a.text().trim();
        const href = a.attr("href");
        let slug = "";
        if (href) {
          const splitHref = href.split("/");
          if (splitHref.length > 0) {
            slug = splitHref[splitHref.length - 1];
          }
        }

        data.push({ src, name: text, slug });
      });
      res.status(200).json({ data });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
