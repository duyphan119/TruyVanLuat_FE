type Message = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  intent: string;
  entities: {
    name: string;
    value: string;
  }[];
};
export default Message;
