import API from "@/config/api";
import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function post(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const api = new API(
    "https://v3-api.fpt.ai/api/v3",
    "bde60609ad128e382a6eb056fd75536b"
  );

  try {
    const { data } = await api.post("predict", {
      content: req.body.content,
      save_history: false,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
}
