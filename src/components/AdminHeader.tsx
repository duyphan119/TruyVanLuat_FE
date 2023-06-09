import { DASHBOARD } from "@/utils/constants";
import { GrMenu } from "react-icons/gr";

type Props = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

const AdminHeader = ({ sidebarOpen, onToggleSidebar }: Props) => {
  return (
    <header
      className="px-6 bg-blue-200 z-[9999] flex items-center gap-4"
      style={{
        height: DASHBOARD.HEADER_HEIGHT,
      }}
    >
      <span className="cursor-pointer text-2xl" onClick={onToggleSidebar}>
        <GrMenu />
      </span>
      Header
    </header>
  );
};

export default AdminHeader;
