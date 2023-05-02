import API from "@/config/api";
import Employee from "@/types/employee/Employee";
import { useStore, create } from "zustand";

const api = new API("https://6347a3670484786c6e84e128.mockapi.io/api/v1");

interface IEmployeeStore {
  rows: Employee[];
  totalPage: number;
  get: (params?: any) => Promise<void>;
}

const useEmployeeStore = create<IEmployeeStore>((set) => ({
  rows: [],
  totalPage: 1,
  add: (newRow: Employee, max?: number) =>
    set((state) => {
      if (max && state.rows.length < max) {
        return { rows: [newRow, ...state.rows] };
      } else {
        state.rows.pop();
        return { rows: [newRow, ...state.rows] };
      }
    }),
  edit: (id: string, newRow: Employee) =>
    set((state) => {
      const index = state.rows.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.rows[index] = newRow;
      }
      return { rows: state.rows };
    }),
  delete: (id: string) =>
    set((state) => {
      const index = state.rows.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.rows.splice(index, 1);
      }
      return { rows: state.rows };
    }),
  get: async (params?: any) => {
    const data = await api.get("employees");

    const { p, limit } = params;
    if (p && limit) {
      const totalPage = Math.ceil(data.length / limit);

      const newData = data.splice((p - 1) * limit, limit);

      return set({ rows: newData, totalPage });
    }

    return set({ rows: data });
  },
}));

export default useEmployeeStore;
