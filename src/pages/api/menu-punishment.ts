import Chapter from "@/types/chapter/Chapter";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  chapters: Chapter[];
};

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data: html } = await axios.get(
    "https://thuvienphapluat.vn/van-ban/Vi-pham-hanh-chinh/Nghi-dinh-100-2019-ND-CP-xu-phat-vi-pham-hanh-chinh-linh-vuc-giao-thong-duong-bo-va-duong-sat-426369.aspx"
  );

  const $ = cheerio.load(html);
  const chapters: Chapter[] = [];
  $(".content1 p a").each(function () {
    const title = $(this).find("b").text().replace("\n", " ");
    const lastChapter = chapters[chapters.length - 1];
    const id = $(this).attr("name");
    if (title.startsWith("Chương ") || title === "C") {
      chapters.push({ title: "", clauses: [], id: "" });
    } else if (title.startsWith("Điều ") && lastChapter?.clauses) {
      lastChapter.clauses.push({
        id: id || "",
        title,
      });
    } else if (lastChapter?.title === "") {
      lastChapter.id = id || "";
      lastChapter.title = `Chương ${chapters.length}. ${title}`;
    }
  });

  res.status(200).json({ chapters });
}
