import API from "@/config/api";
import PaginationResponse from "@/types/response/PaginationResponse";
import VanBan from "@/types/vanban/VanBan";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";

const api = new API();
const getAllCrawled = (limit?: number): Promise<VanBanCrawled[]> =>
  api.get("van-ban", { limit });
const getBySlug = (slug: string): Promise<VanBanCrawled[]> =>
  api.get(`van-ban/${slug}`);
const getAll = (
  page?: number,
  limit?: number
): Promise<PaginationResponse<VanBanCrawled>> =>
  api.get("van-ban", { limit, page });

const vanbanApi = { getAllCrawled, getBySlug, getAll };

export default vanbanApi;
