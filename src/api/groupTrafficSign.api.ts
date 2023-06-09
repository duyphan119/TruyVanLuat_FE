import API from "@/config/api";
import CreateGroupTrafficSignDTO from "@/types/groupTrafficSign/CreateGroupTrafficSignDTO";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import GroupTrafficSignParams from "@/types/groupTrafficSign/GroupTrafficSignParams";
import PaginationResponse from "@/types/response/PaginationResponse";

const api = new API(process.env.LAWS_API);
const getAll = (
  params?: GroupTrafficSignParams
): Promise<PaginationResponse<GroupTrafficSign>> =>
  api.get("group-traffic-signs", params);
const createOne = (dto: CreateGroupTrafficSignDTO): Promise<GroupTrafficSign> =>
  api.post("group-traffic-signs", dto);

const groupTrafficSignApi = { getAll, createOne };

export default groupTrafficSignApi;
