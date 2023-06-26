import API from "@/config/api";
import PaginationResponse from "@/types/response/PaginationResponse";
import TextParams from "@/types/text/TextParams";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import VanBanCrawledParams from "@/types/vanban/VanBanCrawledParams";

const api = new API();
const getAllCrawled = (limit?: number): Promise<VanBanCrawled[]> =>
  api.get("van-ban", { limit });
const getBySlug = (slug: string): Promise<VanBanCrawled[]> =>
  api.get(`van-ban/${slug}`);
const getAll = (params?: any): Promise<PaginationResponse<VanBanCrawled>> =>
  api.get("van-ban", params);
const search = (params?: any): Promise<PaginationResponse<VanBanCrawled>> =>
  api.get("van-ban/search", params);

const vanbanApi = { getAllCrawled, getBySlug, getAll, search };

export default vanbanApi;
