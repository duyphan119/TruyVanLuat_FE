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
    "https://thuvienphapluat.vn/van-ban/Giao-thong-Van-tai/Van-ban-hop-nhat-15-VBHN-VPQH-2019-Luat-Giao-thong-duong-bo-424690.aspx"
  );

  const $ = cheerio.load(html);

  const contentHtml = $(".content1").html();

  res.status(200).json({ html: contentHtml || "" });
}
