import { DASHBOARD } from "@/utils/constants";
import { ReactNode, useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen((state) => !state);
  };

  return (
    <div className="flex">
      <AdminSidebar open={sidebarOpen} />
      <div
        className="relative overflow-y-auto flex flex-col bg-green-200 min-h-screen flex-1 transition-all duration-500"
        style={{
          marginLeft: sidebarOpen ? DASHBOARD.SIDEBAR_WIDTH : 0,
        }}
      >
        <AdminHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="p-6 bg-[#f6f6f6] flex-1">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
