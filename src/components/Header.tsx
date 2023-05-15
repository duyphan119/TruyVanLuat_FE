import { useEffect, useState } from "react";
import groupViolationApi from "@/api/groupViolation.api";
import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./common/Container";
import Flex from "./common/Flex";
import GroupViolation from "@/types/groupViolation/GroupValidation";

type Props = {};

const items = [
  {
    href: PUBLIC_ROUTES.OVERVIEW,
    label: "Giới thiệu",
  },
  {
    href: PUBLIC_ROUTES.LAWS,
    label: "Luật",
  },
  {
    href: PUBLIC_ROUTES.PUNISHMENTS,
    label: "Xử phạt",
  },
  {
    href: PUBLIC_ROUTES.VIOLATIONS,
    label: "Vi phạm",
  },
  {
    href: PUBLIC_ROUTES.CONTACT,
    label: "Liên hệ",
  },
];

const Header = (props: Props) => {
  const pathname = usePathname();

  const [groupViolations, setGroupViolations] = useState<GroupViolation[]>([]);

  const fetchGroupViolations = () => {
    return groupViolationApi.getAll().then((data) => {
      setGroupViolations(data.rows);
    });
  };

  useEffect(() => {
    fetchGroupViolations();
  }, []);

  return (
    <header className="border-b border-b-gray-200 h-16">
      <Container>
        <Flex className="justify-between relative">
          <div className="">
            <Link href={PUBLIC_ROUTES.HOME}>
              Truy vấn luật giao thông đường bộ
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            {items.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li className="group relative" key={label}>
                  <Link
                    href={href}
                    className={`block px-2 py-4 hover:text-indigo-500  ${
                      isActive ? "border-b-2 border-b-indigo-500" : ""
                    } ${isActive ? "text-indigo-500" : ""}`}
                  >
                    {label}
                  </Link>
                  {label === "Vi phạm" ? (
                    <ul className="absolute top-full right-0 z-10 whitespace-nowrap group-hover:flex hidden group-hover:flex-col group-hover:gap-2 py-2 bg-white shadow">
                      {groupViolations.map((groupViolation) => {
                        return (
                          <li key={groupViolation.id} className="bg-white">
                            <Link
                              href={`${PUBLIC_ROUTES.GROUP_VIOLATIONS}/${groupViolation.id}`}
                              className="block px-4 hover:text-indigo-500"
                              title={`Nhóm vi phạm về ${groupViolation.title}`}
                            >
                              {groupViolation.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
          {/* <div className="ml-8">
            <Search />
          </div> */}
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
