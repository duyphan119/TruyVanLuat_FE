import { create } from "zustand";

type Toast = {
  type: "success" | "error" | "info";
  text: string;
  title: string;
  duration: number;
};

interface IToastStore {
  visible: boolean;
  type: "success" | "error" | "info";
  text: string;
  duration: number;
  title: string;
  show: (toast?: Partial<Toast>) => void;
  hide: () => void;
}

const useToastStore = create<IToastStore>((set) => ({
  visible: false,
  type: "success",
  title: "Thành công",
  text: "Đăng nhập thành công",
  duration: 3456,
  show: async (toast) => {
    return set({
      ...toast,
      visible: true,
    });
  },
  hide: async () => {
    return set({
      visible: false,
    });
  },
}));

export default useToastStore;
