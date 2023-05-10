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

  $("p").each(function () {
    const name = $(this).find("a").attr("name");
    if (name) {
      $(this).attr("id", name);
    }
  });

  const contentHtml = $(".content1").html();

  res.status(200).json({ html: contentHtml || "" });
}
