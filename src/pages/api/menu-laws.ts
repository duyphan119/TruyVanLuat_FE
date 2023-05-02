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
    "https://thuvienphapluat.vn/van-ban/Giao-thong-Van-tai/Van-ban-hop-nhat-15-VBHN-VPQH-2019-Luat-Giao-thong-duong-bo-424690.aspx"
  );

  const $ = cheerio.load(html);
  const chapters: Chapter[] = [];
  $(".content1 p a").each(function () {
    const title = $(this).find("b span").text().replace("\n", " ");
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
