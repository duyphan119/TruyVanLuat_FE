import API from "@/config/api";
import LoginDTO from "@/types/user/LoginDTO";
import RegisterDTO from "@/types/user/RegisterDTO";

const api = new API(process.env.LAWS_API);

const register = (body: RegisterDTO): Promise<any> =>
  api.post("auth/register", body);
const login = (body: LoginDTO): Promise<any> => api.post("auth/login", body);
const getProfile = (): Promise<any> => api.get("auth/profile");
const logout = (): Promise<any> => api.post("auth/logout");

const authApi = { register, login, logout, getProfile };

export default authApi;
