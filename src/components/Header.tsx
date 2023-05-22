import { useEffect, useState } from "react";
import groupViolationApi from "@/api/groupViolation.api";
import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./common/Container";
import Flex from "./common/Flex";
import GroupViolation from "@/types/groupViolation/GroupValidation";
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import useComponentVisible from "@/hooks/useComponentVisible";
import Input from "./common/Input";
import { FaSearch } from "react-icons/fa";
import SearchHeader from "./SearchHeader";

type Props = {};

const items = [
  {
    href: PUBLIC_ROUTES.CHAT,
    label: "Trò chuyện",
    title: "Trò chuyện với Bot",
  },
  {
    href: PUBLIC_ROUTES.VANBAN,
    label: "Văn bản",
    title: "Xem tất cả văn bản",
  },
  {
    href: PUBLIC_ROUTES.VIOLATIONS,
    label: "Vi phạm",
    title: "Xem tất cả vi phạm",
  },
  {
    href: PUBLIC_ROUTES.NEWS,
    label: "Tin tức",
    title: "Xem tất cả tin tức",
  },
];

const Header = (props: Props) => {
  const pathname = usePathname();

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

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
        <Flex className="justify-between relative lg:!gap-12">
          <div className="ml-2 md:ml-0">
            <Link
              href={PUBLIC_ROUTES.HOME}
              className="h-16 flex items-center text-indigo-300 text-lg"
            >
              <span className="text-red-500 underline uppercase font-extrabold">
                Luật
              </span>
              <span className="text-yellow-500 underline uppercase font-bold">
                Giao
              </span>
              <span className="text-green-500 underline uppercase font-semibold">
                Thông
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <SearchHeader />
          </div>
          <label
            className="mr-2 cursor-pointer flex items-center md:hidden"
            htmlFor="drawer"
          >
            <BiMenu fontSize={20} />
          </label>
          <input
            type="checkbox"
            className="[&:checked+div]:translate-x-0"
            id="drawer"
            hidden={true}
            checked={isComponentVisible}
            onChange={(e) => setIsComponentVisible(e.target.checked)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 bg-white shadow translate-x-full transition z-[100] max-w-[100vw] min-w-[50vw] p-3"
            ref={ref}
          >
            <Flex className="flex-col !items-start">
              <label htmlFor="drawer" className="cursor-pointer">
                <GrClose />
              </label>
              <ul className="flex flex-col items-start gap-1">
                {items.map(({ label, href, title }) => {
                  const isActive = pathname === href;
                  return (
                    <li className="group relative" key={label}>
                      <Link
                        href={href}
                        className={`block hover:text-indigo-500 ${
                          isActive ? "border-b-2 border-b-indigo-500" : ""
                        } ${isActive ? "text-indigo-500" : ""}`}
                        title={title}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Flex>
          </div>
          <ul className="md:flex items-center gap-4 hidden">
            {items.map(({ label, href, title }) => {
              const isActive = pathname === href;
              return (
                <li className="group relative" key={label}>
                  <Link
                    href={href}
                    className={`block px-2 py-4 hover:text-indigo-500  ${
                      isActive ? "border-b-2 border-b-indigo-500" : ""
                    } ${isActive ? "text-indigo-500" : ""}`}
                    title={title}
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
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
