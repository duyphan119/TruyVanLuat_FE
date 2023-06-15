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
      // let url = `https://thuvienphapluat.vn/van-ban/Giao-thong-Van-tai/${slug}`;
      let url = `https://vanbanphapluat.co/${slug}`;
      const { data: html } = await axios.get(url);
      // let vanban_code: string = "";
      // let type: string = "";
      // let name: string = "";
      const $ = cheerio.load(html);
      // $(".content1 p").each(function () {
      //   const title = $(this).text().trim();
      //   const align = $(this).attr("align");

      //   const code = $(this).find("a").attr("name");
      //   if (align && align === "center" && vanban_code !== "") {
      //     if (type === "") type = title;
      //     else if (name === "") name = title;
      //   }
      //   if (title.startsWith("Số:")) {
      //     vanban_code = title.split("Số: ")[1] || "100/2019/NĐ-CP";
      //   }
      //   $(this).attr("id", code);
      //   if (code && code.startsWith("muc_")) {
      //     mucs.push({
      //       title,
      //       code,
      //     });
      //   }
      //   // else if (code && code.startsWith("khoan_")) {
      //   //   dieus[dieus.length - 1].khoans.push({
      //   //     title,
      //   //     code,
      //   //     diems: [],
      //   //   });
      //   // } else if (code && code.startsWith("diem_")) {
      //   //   const dieu_cuoi = dieus[dieus.length - 1];
      //   //   if (dieu_cuoi) {
      //   //     const khoan_cuoi = dieu_cuoi.khoans[dieu_cuoi.khoans.length - 1];
      //   //     if (khoan_cuoi) {
      //   //       khoan_cuoi.diems.push({
      //   //         title,
      //   //         code,
      //   //       });
      //   //     }
      //   //   }
      //   // }
      // });
      // $(".content1 a").each(function () {
      //   $(this).removeAttr("onmouseover");
      //   $(this).removeAttr("onclick");
      //   $(this).removeAttr("onmouseout");
      // });
      const obj: any = {
        html: "",
        href: url,
        kind: "",
        code: "",
        issuingOrganization: "",
        signer: "",
      };
      obj.html = "" + $(".tab-pane hr + div").html();
      obj.title = $(".breadcrumb .active").text();

      $(".tab-pane .row .col-md-4 table tbody tr").each(function () {
        const key = $(this).find("td:first-child").text();
        const value = $(this).find("td:last-child").text();
        if (key.indexOf("Loại văn bản") !== -1) {
          obj.kind = value;
        } else if (key.indexOf("Số hiệu") !== -1) {
          obj.code = value;
        } else if (key.indexOf("Cơ quan ban hành") !== -1) {
          obj.issuingOrganization = value;
        } else if (key.indexOf("Người ký") !== -1) {
          obj.signer = value;
        } else if (key.indexOf("Ngày ban hành") !== -1) {
          obj.effectiveDate = value;
        } else if (key.indexOf("Lĩnh vực") !== -1) {
          obj.area = value;
        } else if (key.indexOf("Tình trạng hiệu lực") !== -1) {
          obj.status = value;
        } else if (key.indexOf("Cập nhật") !== -1) {
          obj.updated = value;
        }
      });

      res.status(200).json(obj);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
