import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const { p, q } = req.query;

      const url = `https://vietnamnet.vn/tim-kiem-p${
        p ? +p - 1 : 0
      }?bydaterang=all&cate=00000P&newstype=all&od=2&q=${q || ""}`;

      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const rows: any[] = [];

      $(".horizontalPost").each(function () {
        if (
          $(this).find(".horizontalPost__main-cate a").text().toLowerCase() !==
          "video"
        ) {
          const aEl = $(this).find(".horizontalPost__avt a");
          const href = aEl.attr("href");
          const title = aEl.attr("title");

          const thumbnail = $(this)
            .find(".horizontalPost__avt a img")
            .attr("src");
          const description = $(this)
            .find(".horizontalPost__main-desc p")
            .text();
          const row = {
            slug: "",
            title,
            thumbnail,
            description,
          };
          if (href) {
            const splitHref = href.split("/");
            row.slug = splitHref[splitHref.length - 1];
          }
          rows.push(row);
        }
      });

      res.status(200).json({
        rows,
        isNext: $(".pagination-next").attr("class") ? true : false,
      });

      // const limit = req.query.limit || 5;
      // const page = req.query.page || 1;

      // const baseUrl = "https://vnexpress.net";
      // const url = `${baseUrl}/thoi-su/giao-thong-p${page}`;
      // const { data: html } = await axios.get(url);
      // const $ = cheerio.load(html);
      // const data: News[] = [];
      // if (data.length < limit) {
      //   const title = $(".article-topstory .title-news a").attr("title");
      //   const href = $(".article-topstory .title-news a").attr("href");
      //   let slug = "";
      //   if (href && href.indexOf("video.") === -1) {
      //     const splitHref = href.split(`${baseUrl}/`);
      //     if (splitHref.length > 0) {
      //       slug = splitHref[splitHref.length - 1];
      //     }
      //   }

      //   const thumbnail = $(".article-topstory .thumb-art picture img").attr(
      //     "src"
      //   );

      //   const description = $(".article-topstory .description a").text().trim();
      //   if (
      //     slug !== "" &&
      //     !$(".article-topstory .thumb-art .icon_thumb_videophoto").attr(
      //       "class"
      //     )
      //   )
      //     data.push({
      //       title,
      //       description,
      //       thumbnail,
      //       slug,
      //     });
      // }
      // $(".list-news-subfolder .item-news").each(function () {
      //   if (data.length < limit) {
      //     const title = $(this).find(".title-news a").attr("title");
      //     const href = $(this).find(".title-news a").attr("href");
      //     let slug = "";
      //     if (href && href.indexOf("video.") === -1) {
      //       const splitHref = href.split(`${baseUrl}/`);
      //       if (splitHref.length > 0) {
      //         slug = splitHref[splitHref.length - 1];
      //       }
      //     }
      //     const src = $(this).find(".thumb-art picture img").attr("src");
      //     const srcset = $(this)
      //       .find(".thumb-art picture source")
      //       .attr("data-srcset");
      //     const thumbnail = src?.startsWith("https")
      //       ? src
      //       : srcset
      //       ? srcset?.split(" 1x,")[0]
      //       : "";
      //     const description = $(this).find(".description a").text().trim();
      //     const classNgu = $(this)
      //       .find(".thumb-art .icon_thumb_videophoto")
      //       .attr("class");
      //     if (slug !== "" && !classNgu) {
      //       data.push({
      //         title,
      //         description,
      //         thumbnail,
      //         slug,
      //       });
      //     }
      //   }
      // });

      // res.status(200).json({
      //   rows: data,
      //   isNext: $(".next-page").attr("class") ? true : false,
      // });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Error" });
    }
  }
}
