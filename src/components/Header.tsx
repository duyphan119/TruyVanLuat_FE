import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./common/Container";

type Props = {};

const items = [
  {
    href: PUBLIC_ROUTES.VANBAN,
    label: "Văn bản",
    title: "Xem tất cả văn bản",
  },
  {
    href: PUBLIC_ROUTES.NEWS,
    label: "Tin tức",
    title: "Xem tất cả tin tức",
  },
  {
    href: PUBLIC_ROUTES.TRAFFIC_SIGNS,
    label: "Biển báo hiệu",
    title: "Biến báo hiệu giao thông",
  },
  {
    href: PUBLIC_ROUTES.CHAT,
    label: "Trò chuyện",
    title: "Trò chuyện với Bot",
  },
];

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const pathname = usePathname();

  const isAtHomePage = pathname === PUBLIC_ROUTES.HOME;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const { ref, isComponentVisible, setIsComponentVisible } =
  //   useComponentVisible(false);

  // const [groupViolations, setGroupViolations] = useState<GroupViolation[]>([]);

  // const fetchGroupViolations = () => {
  //   return groupViolationApi.getAll().then((data) => {
  //     setGroupViolations(data.rows);
  //   });
  // };

  // useEffect(() => {
  //   fetchGroupViolations();
  // }, []);

  return (
    <header
      className={`text-white fixed transition-all duration-500 top-0 left-0 right-0 z-[9999]${
        isScrolled
          ? " bg-[#1e2022] h-20"
          : ` ${isAtHomePage ? "bg-transparent h-[90px]" : "bg-[#1e2022] h-20"}`
      }`}
    >
      <Container className="h-full">
        <nav className="h-full flex items-center justify-between">
          <Link href={PUBLIC_ROUTES.HOME} className="" title="Trang chủ">
            <span className="font-bold">LUAT</span>
            <span className="font-semibold">GIAO</span>
            <span className="font-medium">THONG</span>
          </Link>
          <ul className="flex items-center gap-8 h-full">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li className={`h-full`} key={item.label} title={item.title}>
                  <Link
                    href={item.href}
                    className={`h-full relative flex items-center hover:before:absolute hover:before:bottom-1/4 hover:before:left-1/2 hover:before:-translate-x-1/2 hover:before:w-1/3 hover:before:h-[2px] hover:before:bg-white ${
                      isActive
                        ? " before:absolute before:bottom-1/4 before:left-1/2 before:-translate-x-1/2 before:w-1/3 before:h-[2px] before:bg-white"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );

  // return (
  //   <header className="border-b border-b-gray-200 h-16">
  //     <Container>
  //       <Flex className="justify-between relative lg:!gap-12">
  //         <div className="ml-2 md:ml-0">
  //           <Link
  //             href={PUBLIC_ROUTES.HOME}
  //             className="h-16 flex items-center text-indigo-300 text-lg"
  //           >
  //             <span className="text-red-500 underline uppercase font-extrabold">
  //               Luật
  //             </span>
  //             <span className="text-yellow-500 underline uppercase font-bold">
  //               Giao
  //             </span>
  //             <span className="text-green-500 underline uppercase font-semibold">
  //               Thông
  //             </span>
  //           </Link>
  //         </div>
  //         <div className="flex-1 relative">
  //           <SearchHeader />
  //         </div>
  //         <label
  //           className="mr-2 cursor-pointer flex items-center md:hidden"
  //           htmlFor="drawer"
  //         >
  //           <BiMenu fontSize={20} />
  //         </label>
  //         <input
  //           type="checkbox"
  //           className="[&:checked+div]:translate-x-0"
  //           id="drawer"
  //           hidden={true}
  //           checked={isComponentVisible}
  //           onChange={(e) => setIsComponentVisible(e.target.checked)}
  //         />
  //         <div
  //           className="fixed top-0 right-0 bottom-0 bg-white shadow translate-x-full transition z-[100] max-w-[100vw] min-w-[50vw] p-3"
  //           ref={ref}
  //         >
  //           <Flex className="flex-col !items-start">
  //             <label htmlFor="drawer" className="cursor-pointer">
  //               <GrClose />
  //             </label>
  //             <ul className="flex flex-col items-start gap-1">
  //               {items.map(({ label, href, title }) => {
  //                 const isActive = pathname === href;
  //                 return (
  //                   <li className="group relative" key={label}>
  //                     <Link
  //                       href={href}
  //                       className={`block hover:text-[var(--mainColor)] ${
  //                         isActive ? "border-b-2 border-b-[var(--mainColor)]" : ""
  //                       } ${isActive ? "text-[var(--mainColor)]" : ""}`}
  //                       title={title}
  //                     >
  //                       {label}
  //                     </Link>
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           </Flex>
  //         </div>
  //         <ul className="md:flex items-center gap-4 hidden">
  //           {items.map(({ label, href, title }) => {
  //             const isActive = pathname === href;
  //             return (
  //               <li className="group relative" key={label}>
  //                 <Link
  //                   href={href}
  //                   className={`block px-2 py-4 hover:text-[var(--mainColor)]  ${
  //                     isActive ? "border-b-2 border-b-[var(--mainColor)]" : ""
  //                   } ${isActive ? "text-[var(--mainColor)]" : ""}`}
  //                   title={title}
  //                 >
  //                   {label}
  //                 </Link>
  //                 {/* {label === "Vi phạm" ? (
  //                   <ul className="absolute top-full right-0 z-10 whitespace-nowrap group-hover:flex hidden group-hover:flex-col group-hover:gap-2 py-2 bg-white shadow">
  //                     {groupViolations.map((groupViolation) => {
  //                       return (
  //                         <li key={groupViolation.id} className="bg-white">
  //                           <Link
  //                             href={`${PUBLIC_ROUTES.GROUP_VIOLATIONS}/${groupViolation.id}`}
  //                             className="block px-4 hover:text-[var(--mainColor)]"
  //                             title={`Nhóm vi phạm về ${groupViolation.title}`}
  //                           >
  //                             {groupViolation.title}
  //                           </Link>
  //                         </li>
  //                       );
  //                     })}
  //                   </ul>
  //                 ) : null} */}
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </Flex>
  //     </Container>
  //   </header>
  // );
};

export default Header;
