import API from "@/config/api";
import GroupViolation from "@/types/groupViolation/GroupValidation";
import PaginationResponse from "@/types/response/PaginationResponse";

const getAll = (): Promise<PaginationResponse<GroupViolation>> => {
  const api = new API(process.env.LAWS_API);

  return api.get("group-violations").catch((error) => console.log(error));
};

const groupViolationApi = { getAll };

export default groupViolationApi;
