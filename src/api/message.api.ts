import API from "@/config/api";
import CreateMessageDTO from "@/types/message/CreateMessageDTO";
import Message from "@/types/message/Message";

const api = new API(process.env.LAWS_API);

const getAll = (): Promise<Message[]> => api.get("messages");

const createOne = (dto: CreateMessageDTO): Promise<Message> =>
  api.post("messages", dto);

const messageApi = { getAll, createOne };

export default messageApi;
