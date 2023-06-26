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

const updateOne = (
  id: string,
  body: Partial<Violation>
): Promise<{ is_success: boolean }> => api.patch(`violations/${id}`, body);

const getById = (id: string): Promise<any> => api.get(`violations/${id}`);

const getRelated = (id: string): Promise<any[]> =>
  api.get(`violations/related/${id}`);

const search = (params: {
  keyword: string;
  p?: number;
  limit?: number;
}): Promise<PaginationResponse<any>> => api.get(`violations/search`, params);

const violationApi = {
  getById,
  search,
  getAll,
  updateOne,
  getRelated,
};

export default violationApi;
