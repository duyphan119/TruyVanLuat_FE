import { DASHBOARD, PROTECTED_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLayerGroup } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbRoadSign } from "react-icons/tb";
import { MdMoneyOff } from "react-icons/md";

type Props = {
  open: boolean;
};

const items = [
  {
    label: "Menu",
    children: [
      {
        label: "Nhóm biển báo",
        title: "Nhóm biển báo giao thông",
        href: PROTECTED_ROUTES.GROUP_TRAFFIC_SIGNS,
        icon: FaLayerGroup,
      },
      {
        label: "Biển báo",
        title: "Biển báo giao thông",
        href: PROTECTED_ROUTES.TRAFFIC_SIGNS,
        icon: TbRoadSign,
      },
      {
        label: "Xử phạt",
        title: "Xử phạt giao thông",
        href: PROTECTED_ROUTES.VIOLATIONS,
        icon: MdMoneyOff,
      },
    ],
  },
  {
    label: "Tài khoản",
    children: [
      {
        label: "Thông tin tài khoản",
        title: "Thông tin tài khoản",
        href: PROTECTED_ROUTES.PROFILE,
        icon: FaLayerGroup,
      },
      {
        label: "Đăng xuất",
        title: "Đăng xuất",
        icon: IoIosLogOut,
      },
    ],
  },
];

const AdminSidebar = ({ open }: Props) => {
  const pathname = usePathname();

  const handleLogout = () => {
    //
  };

  return (
    <aside
      className="bg-[#1c2434] text-white fixed top-0 left-0 bottom-0 z-[9999] transition-all duration-500"
      style={{
        width: DASHBOARD.SIDEBAR_WIDTH,
        transform: `translateX(${
          open ? "0" : "-" + DASHBOARD.SIDEBAR_WIDTH + "px"
        })`,
      }}
    >
      <Link
        href={PROTECTED_ROUTES.DASHBOARD}
        className="logo px-4 flex items-center"
        title="Trang chủ"
        style={{ height: DASHBOARD.HEADER_HEIGHT }}
      >
        <span className="font-bold">LUAT</span>
        <span className="font-semibold">GIAO</span>
        <span className="font-medium">THONG</span>
      </Link>
      <nav>
        <ul className="px-4 flex flex-col gap-6">
          {items.map((item, index) => {
            return (
              <li key={index}>
                <span className="text-neutral-500 mx-2">{item.label}</span>
                {item.children.length > 0 ? (
                  <ul className="flex flex-col mt-2">
                    {item.children.map((child, indexChild) => {
                      const Icon = child.icon;
                      const linkClassName =
                        "flex items-center gap-2 hover:bg-[#5d5e60ab] p-2 hover:rounded-sm w-full";
                      return (
                        <li key={indexChild}>
                          {child.href ? (
                            <Link
                              href={child.href}
                              className={linkClassName}
                              title={child.title}
                            >
                              <Icon />
                              {child.label}
                            </Link>
                          ) : (
                            <button
                              className={linkClassName}
                              title={child.title}
                              onClick={handleLogout}
                            >
                              <Icon />
                              {child.label}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
