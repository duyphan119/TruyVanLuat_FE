import API from "@/config/api";
import News from "@/types/news/News";

const api = new API();
const getAll = (limit?: number): Promise<News[]> => api.get("news", { limit });
const getBySlug = (slug: string): Promise<News> => api.get(`news/slug/${slug}`);

const newsApi = { getAll, getBySlug };

export default newsApi;
