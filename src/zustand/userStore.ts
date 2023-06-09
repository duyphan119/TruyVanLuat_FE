import authApi from "@/api/auth.api";
import User from "@/types/user/User";
import { create } from "zustand";

interface IUserStore {
  profile: User | null;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
  isFetchedProfile: boolean;
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
}));

export default useUserStore;
