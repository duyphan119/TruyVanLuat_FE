import dbConnect from "@/config/db";
import VanBan from "@/models/VanBan";
import Dieu from "@/types/dieu/Dieu";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const url = req.body.url;
  try {
    await dbConnect();
    let vanBan = await VanBan.findOne({ href: url });
    let content: string | null = "";
    if (!vanBan) {
      const dieus: Dieu[] = [];
      const { data: html } = await axios.get(url);
      let vanban_code: string = "";
      const $ = cheerio.load(html);
      $(".content1 p").each(function () {
        const title = $(this).text().trim();
        if (title.startsWith("Số:") && title.endsWith("NĐ-CP")) {
          vanban_code = title.split("Số: ")[1];
        }
        const code = $(this).find("a").attr("name");
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
      content = `${$(".content1").html()}`
        .replaceAll(`onmouseover="LS_Tootip_Type_Bookmark_DC_Archive();"`, "")
        .replaceAll(`onmouseout="hideddrivetip();"`, "");
      vanBan = await VanBan.create({
        short_code: vanban_code.split("/")[0],
        dieus,
        href: url,
        code: vanban_code,
        html: content,
      });
    }

    res.status(200).json(vanBan);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error" });
  }
}
