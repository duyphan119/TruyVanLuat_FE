import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  html: string;
};

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data: html } = await axios.get(
    "https://thuvienphapluat.vn/van-ban/Vi-pham-hanh-chinh/Nghi-dinh-100-2019-ND-CP-xu-phat-vi-pham-hanh-chinh-linh-vuc-giao-thong-duong-bo-va-duong-sat-426369.aspx"
  );

  const $ = cheerio.load(html);

  const contentHtml = $(".content1").html();

  res.status(200).json({ html: contentHtml || "" });
}
