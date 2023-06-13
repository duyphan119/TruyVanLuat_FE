import { DASHBOARD } from "@/utils/constants";
import useUserStore from "@/zustand/userStore";
import { FaSearch } from "react-icons/fa";
import { GrMenu } from "react-icons/gr";

type Props = {
  onToggleSidebar: () => void;
};

const AdminHeader = ({ onToggleSidebar }: Props) => {
  const { profile } = useUserStore();
  return (
    <header
      className="px-6 bg-white shadow z-[9999] flex items-center justify-between"
      style={{
        height: DASHBOARD.HEADER_HEIGHT,
      }}
    >
      <div className="left flex items-center gap-4 flex-1">
        <span className="cursor-pointer text-2xl" onClick={onToggleSidebar}>
          <GrMenu />
        </span>
        <div className="relative flex-1">
          <input
            className="py-2 pr-2 pl-9 border border-neutral-300 w-full rounded-sm outline-neutral-400 focus:border-transparent"
            type="search"
            placeholder="Nhập từ khoá để tìm kiếm"
          />
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
            <FaSearch />
          </span>
        </div>
      </div>
      <div className="right flex-1 flex items-center gap-4 justify-end">
        <p className="text-neutral-500">
          Xin chào,{" "}
          <span className="font-medium text-black">{profile?.full_name}</span>
        </p>
      </div>
    </header>
  );
};

export default AdminHeader;
