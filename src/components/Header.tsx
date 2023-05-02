import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./common/Container";
import Flex from "./common/Flex";
import Search from "./Search";

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
    href: PUBLIC_ROUTES.CONTACT,
    label: "Liên hệ",
  },
];

const Header = (props: Props) => {
  const pathname = usePathname();

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
                <li className="hover:text-indigo-500" key={label}>
                  <Link
                    href={href}
                    className={`block px-2 py-4 ${
                      isActive ? "border-b-2 border-b-indigo-500" : ""
                    } ${isActive ? "text-indigo-500" : ""}`}
                  >
                    {label}
                  </Link>
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
