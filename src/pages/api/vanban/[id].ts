import dbConnect from "@/config/db";
import VanBan from "@/models/VanBan";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  try {
    await dbConnect();
    let vanBan = await VanBan.findOne({ short_code: id });
    res.status(200).json(vanBan);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Error" });
  }
}
