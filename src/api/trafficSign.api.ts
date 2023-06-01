import API from "@/config/api";
import PaginationResponse from "@/types/response/PaginationResponse";
import TrafficSign from "@/types/trafficSign/TrafficSign";

const api = new API();
const lawsApi = new API(process.env.LAWS_API);
const getAll = (): Promise<PaginationResponse<TrafficSign>> =>
  lawsApi.get("traffic-sign");

const trafficSignApi = { getAll };

export default trafficSignApi;
