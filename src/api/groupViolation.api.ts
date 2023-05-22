import API from "@/config/api";
import GroupViolation from "@/types/groupViolation/GroupValidation";
import PaginationResponse from "@/types/response/PaginationResponse";

const api = new API(process.env.LAWS_API);

const getAll = (): Promise<PaginationResponse<GroupViolation>> =>
  api.get("group-violations");

const groupViolationApi = { getAll };

export default groupViolationApi;
