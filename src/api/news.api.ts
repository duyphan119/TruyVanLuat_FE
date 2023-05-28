import API from "@/config/api";
import News from "@/types/news/News";
import IsNextResponse from "@/types/response/IsNextResponse";

type NewsParams = {
  page?: number;
  limit?: number;
};

const api = new API();
const getAll = (params?: NewsParams): Promise<IsNextResponse<News>> =>
  api.get("news", params);
const getBySlug = (slug: string): Promise<News> => api.get(`news/slug/${slug}`);

const newsApi = { getAll, getBySlug };

export default newsApi;
