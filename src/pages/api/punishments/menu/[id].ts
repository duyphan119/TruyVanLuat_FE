import Dieu from "@/types/dieu/Dieu";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  dieus: Dieu[];
};

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  let url = "";
  if (id === "123") {
    url =
      "https://thuvienphapluat.vn/van-ban/Vi-pham-hanh-chinh/Nghi-dinh-123-2021-ND-CP-sua-doi-Nghi-dinh-xu-phat-vi-pham-hanh-chinh-linh-vuc-hang-hai-477975.aspx";
  } else {
    url =
      "https://thuvienphapluat.vn/van-ban/Vi-pham-hanh-chinh/Nghi-dinh-100-2019-ND-CP-xu-phat-vi-pham-hanh-chinh-linh-vuc-giao-thong-duong-bo-va-duong-sat-426369.aspx";
  }
  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);
  const dieus: Dieu[] = [];
  $(".content1 p").each(function () {
    const title = $(this).text().trim();
    const id = $(this).find("a").attr("name");
    if (id && id.startsWith("dieu_") && title.includes("Điều")) {
      dieus.push({
        title,
        id,
        khoans: [],
      });
    } else if (id && id.startsWith("khoan_")) {
      dieus[dieus.length - 1].khoans.push({
        title,
        id,
      });
    }
  });

  res.status(200).json({ dieus });
}
