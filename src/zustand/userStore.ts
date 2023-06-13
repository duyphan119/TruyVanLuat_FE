import authApi from "@/api/auth.api";
import LoginDTO from "@/types/user/LoginDTO";
import RegisterDTO from "@/types/user/RegisterDTO";
import User from "@/types/user/User";
import { create } from "zustand";

interface IUserStore {
  profile: User | null;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
  isFetchedProfile: boolean;
  register: (dto: RegisterDTO) => Promise<void>;
  login: (dto: LoginDTO) => Promise<void>;
}

const useUserStore = create<IUserStore>((set) => ({
  isFetchedProfile: false,
  profile: null,
  getProfile: async () => {
    let data = null;
    try {
      data = await authApi.getProfile();
    } catch (error) {}

    return set({ profile: data, isFetchedProfile: true });
  },
  logout: async () => {
    let data = null;
    try {
      data = await authApi.logout();
    } catch (error) {}

    return set({ profile: null });
  },
  register: async (dto: RegisterDTO) => {
    let data = null;
    try {
      data = await authApi.register(dto);
    } catch (error) {}

    return set({ profile: data });
  },
  login: async (dto: LoginDTO) => {
    let data = null;
    try {
      data = await authApi.login(dto);
    } catch (error) {}

    return set({ profile: data });
  },
}));

export default useUserStore;
