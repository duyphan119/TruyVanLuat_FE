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
  if (req.method === "GET") {
    const { slug } = req.query;
    try {
      let content: string | null = "";
      const mucs: any[] = [];
      let url = `https://thuvienphapluat.vn/van-ban/Giao-thong-Van-tai/${slug}`;
      const { data: html } = await axios.get(url);
      let vanban_code: string = "";
      let type: string = "";
      let name: string = "";
      const $ = cheerio.load(html);
      $(".content1 p").each(function () {
        const title = $(this).text().trim();
        const align = $(this).attr("align");

        const code = $(this).find("a").attr("name");
        if (align && align === "center" && vanban_code !== "") {
          if (type === "") type = title;
          else if (name === "") name = title;
        }
        if (title.startsWith("Số:")) {
          vanban_code = title.split("Số: ")[1] || "100/2019/NĐ-CP";
        }
        $(this).attr("id", code);
        if (code && code.startsWith("muc_")) {
          mucs.push({
            title,
            code,
          });
        }
        // else if (code && code.startsWith("khoan_")) {
        //   dieus[dieus.length - 1].khoans.push({
        //     title,
        //     code,
        //     diems: [],
        //   });
        // } else if (code && code.startsWith("diem_")) {
        //   const dieu_cuoi = dieus[dieus.length - 1];
        //   if (dieu_cuoi) {
        //     const khoan_cuoi = dieu_cuoi.khoans[dieu_cuoi.khoans.length - 1];
        //     if (khoan_cuoi) {
        //       khoan_cuoi.diems.push({
        //         title,
        //         code,
        //       });
        //     }
        //   }
        // }
      });
      $(".content1 a").each(function () {
        $(this).removeAttr("onmouseover");
        $(this).removeAttr("onclick");
        $(this).removeAttr("onmouseout");
      });
      content = $(".content1").html();

      const vanBan = {
        short_code: vanban_code.split("/")[0],
        mucs,
        href: url,
        code: vanban_code,
        html: content,
        type,
        title: name,
      };

      res.status(200).json(vanBan);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
