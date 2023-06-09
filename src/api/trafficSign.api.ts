import API from "@/config/api";
import CreateTrafficSignDTO from "@/types/trafficSign/CreateTrafficSignDTO";
import TrafficSign from "@/types/trafficSign/TrafficSign";
import TrafficSignParams from "@/types/trafficSign/TrafficSignParams";
import PaginationResponse from "@/types/response/PaginationResponse";

const api = new API(process.env.LAWS_API);
const getAll = (
  params?: TrafficSignParams
): Promise<PaginationResponse<TrafficSign>> => api.get("traffic-signs", params);
const createOne = (dto: CreateTrafficSignDTO): Promise<TrafficSign> =>
  api.post("traffic-signs", dto);

const trafficSignApi = { getAll, createOne };

export default trafficSignApi;
