import dbConnect from "@/config/db";
import VanBan from "@/models/VanBan";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

async function test(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    await dbConnect();
    const short_code = 100;
    let { dieus } = await VanBan.findOne({ short_code: short_code });
    dieus = dieus.map((dieu: any) => {
      const splitTitle = dieu.title.split(" ");
      splitTitle.shift();
      splitTitle.shift();
      const splitCode = dieu.code.split("_");
      // if(splitCode[0] === 'diem'){
      //   dieu.detail = `Điểm ${splitCode[3]} Khoản ${splitCode[2]} Điều ${splitCode[1]} NĐ ${short_code}`;
      // }
      // else if (splitCode[0] === "khoan") {
      //    `Khoản ${splitCode[2]} Điều ${splitCode[1]} NĐ ${short_code}`;
      // }
      return {
        ...dieu,
        title: splitTitle.join(" "),
        detail: `Điều ${splitCode[1]} NĐ ${short_code}`,
        khoans: dieu.khoans.map((khoan: any) => {
          const splitTitle = khoan.title.split(" ");
          splitTitle.shift();
          const newTitle = splitTitle.join(" ");
          const splitCode = khoan.code.split("_");
          const punishment = newTitle
            .split(
              " đối với người điều khiển xe thực hiện một trong các hành vi vi phạm sau đây"
            )[0]
            .split(" đối với một trong các hành vi vi phạm sau đây")[0]
            .split(" thực hiện một trong các hành vi vi phạm sau đây:")[0];
          return {
            ...khoan,
            title: newTitle,
            detail: `Khoản ${splitCode[2]} Điều ${splitCode[1]} NĐ ${short_code}`,
            diems: khoan.diems.map((diem: any) => {
              const splitTitle = diem.title.split(" ");
              splitTitle.shift();
              const splitCode = diem.code.split("_");
              return {
                ...diem,
                title: splitTitle.join(" "),
                detail: `Điểm ${splitCode[3]} Khoản ${splitCode[2]} Điều ${splitCode[1]} NĐ ${short_code}`,
                punishment,
              };
            }),
            // .filter((diem: any) => diem.punishment.startsWith("Phạt")),
          };
        }),
        // .filter((khoan: any) => khoan.diems.length > 0),
      };
    });
    // .filter((dieu: any) => dieu.khoans.length > 0);
    // const diems: any[] = [];
    // dieus.forEach((dieu: any) => {
    //   dieu.khoans.forEach((khoan: any) => {
    //     khoan.diems.forEach((diem: any) => {
    //       diems.push(diem);
    //     });
    //   });
    // });
    // const capitalizeFirstLetter = (str: string) => {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // };

    const khoans: any[] = [];
    dieus.forEach((dieu: any) => {
      dieu.khoans.forEach((khoan: any) => {
        if (khoan.diems.length === 0 && khoan.title.indexOf(" này ") === -1) {
          khoans.push(khoan);
        }
      });
    });
    // const capitalizeFirstLetter = (str: string) => {
    //   return str.charAt(0).toUpperCase() + str.slice(1);
    // };

    // const group = dieus
    //   .filter((dieu: any) =>
    //     dieu.title.startsWith("Xử phạt các hành vi vi phạm ")
    //   )
    //   .map((dieu: any) => {
    //     const getTitle = (title: string) => {
    //       const split1 = title.split("về ");
    //       if (split1.length > 1) return capitalizeFirstLetter(split1[1]);
    //       const split2 = title.split("quy định ");
    //       if (split2.length > 1) return capitalizeFirstLetter(split2[1]);
    //       const split3 = title.split("vi phạm ");
    //       if (split3.length > 1) return capitalizeFirstLetter(split3[1]);
    //     };
    //     return { group_violation: getTitle(dieu.title), ...dieu };
    //   })
    //   .filter((dieu: any) => dieu.group_violation !== "");

    res.status(200).json(
      khoans
      // group
    );
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const date = new Date();

      const { limit } = req.query;
      const pageSize = limit ? +limit : 10;

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const dayStr = (day < 10 ? "0" : "") + day;
      const monthStr = (month < 10 ? "0" : "") + month;

      const url = `https://thuvienphapluat.vn/page/tim-van-ban.aspx?keyword=giao%20th%C3%B4ng%20%C4%91%C6%B0%E1%BB%9Dng%20b%E1%BB%99&area=1&type=0&status=0&lan=1&org=0&signer=0&match=True&sort=2&bdate=22/05/1943&edate=${dayStr}/${monthStr}/${year}`;

      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);

      const vanbans: any[] = [];

      // $(".ByKey-1").each(function () {
      //   if (vanbans.length < pageSize) {
      //     const aEl = $(this).find(".nqTitle a");
      //     const title = aEl.text();
      //     const href = aEl.attr("href");
      //     let slug = "";
      //     if (href) {
      //       const splitHref = href.split("/");
      //       if (splitHref.length > 0) {
      //         slug = splitHref[splitHref.length - 1];
      //       }
      //     }
      //     vanbans.push({ title, slug });
      //   }
      // });
      $(`div[class^="content-"]`).each(function () {
        if (vanbans.length < pageSize) {
          const aEl = $(this).find(".nqTitle a");
          const title = aEl.text();
          const href = aEl.attr("href");
          let slug = "";
          if (href) {
            const splitHref = href.split("/");
            if (splitHref.length > 0) {
              slug = splitHref[splitHref.length - 1];
            }
          }
          let issue = "";
          $(this)
            .find(".right-col p")
            .each(function () {
              const text = $(this).text().trim();
              if (text.indexOf("Ban hành") !== -1) {
                const splitText = text.split(" ");
                issue = splitText[splitText.length - 1];
              }
            });
          vanbans.push({ title, slug, issue });
        }
      });
      res.status(200).json(vanbans);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    }
  }
}
