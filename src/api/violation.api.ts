import API from "@/config/api";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";

export type ViolationParams = {
  group_violation_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_type?: string;
};

const api = new API(process.env.LAWS_API);

const getAll = (
  params?: ViolationParams
): Promise<PaginationResponse<Violation>> => api.get("violation", params);

const getById = (id: string): Promise<Violation> =>
  api.get(`violation/${id}`).catch((error) => console.log(error));

const search = (
  keyword: string,
  p?: number,
  limit?: number
): Promise<PaginationResponse<Violation>> =>
  api
    .get(`violation/search`, { keyword, p, limit })
    .catch((error) => console.log(error));

const violationApi = {
  getById,
  search,
  getAll,
};

export default violationApi;