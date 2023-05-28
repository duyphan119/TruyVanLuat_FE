import API from "@/config/api";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";

export type ViolationParams = {
  keyword?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_type?: string;
};

const api = new API(process.env.LAWS_API);

const getAll = (
  params?: ViolationParams
): Promise<PaginationResponse<Violation>> => api.get("violations", params);

const getById = (id: string): Promise<Violation> => api.get(`violations/${id}`);

const search = (
  keyword: string,
  p?: number,
  limit?: number
): Promise<PaginationResponse<Violation>> =>
  api.get(`violations/search`, { keyword, p, limit });

const violationApi = {
  getById,
  search,
  getAll,
};

export default violationApi;
