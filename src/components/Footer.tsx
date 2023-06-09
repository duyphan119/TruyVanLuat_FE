import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { BsInstagram, BsTelephoneFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImFacebook } from "react-icons/im";
import Container from "./common/Container";
import Flex from "./common/Flex";

type Props = {};

const Footer = (props: Props) => {
  const showTitle = (title: string) => (
    <h3 className="title text-3xl mb-10">{title}</h3>
  );

  return (
    <footer className="bg-[#334965] text-white">
      <Container className="py-20">
        <div className="grid grid-cols-12 gap-12">
          <div className="lg:col-span-3 md:col-span-6 col-span-12">
            {showTitle("Giới thiệu")}
            <p className="about">
              Website cung cấp thông tin chi tiết các quy định về luật giao
              thông đường bộ, cung cấp công cụ tìm kiếm hữu ích hỗ trợ người
              dùng tra cứu thông tin hiệu quả.
            </p>
          </div>
          <div className="lg:col-span-3 md:col-span-6 col-span-12">
            {showTitle("Tra cứu")}
            <ol className="topics flex flex-col gap-4">
              {[
                "Văn bản luật",
                "Tin tức giao thông",
                "Chatbot hỗ trợ tra cứu",
              ].map((text, index) => {
                return (
                  <li className="before:content-['-'] before:mr-3" key={index}>
                    {text}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lg:col-span-2 md:col-span-6 col-span-12">
            {showTitle("Trang")}
            <ol className="pages flex flex-col gap-4">
              {[
                {
                  title: "Trang chủ",
                  href: PUBLIC_ROUTES.HOME,
                },
                {
                  title: "Văn bản",
                  href: PUBLIC_ROUTES.VANBAN,
                },
                {
                  title: "Tin tức",
                  href: PUBLIC_ROUTES.NEWS,
                },
                {
                  title: "Biển báo hiệu",
                  href: PUBLIC_ROUTES.TRAFFIC_SIGNS,
                },
                {
                  title: "Trò chuyện",
                  href: PUBLIC_ROUTES.CHAT,
                },
              ].map((item, index) => {
                return (
                  <li className="" key={index}>
                    <Link
                      href={item.href}
                      className="before:content-['-'] before:mr-3 hover:text-[var(--mainColor)]"
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="lg:col-span-4 md:col-span-6 col-span-12">
            {showTitle("Liên hệ với chúng tôi")}
            <ul className="flex flex-col gap-4">
              {[
                {
                  icon: GrMail,
                  value: "6051071019@st.utc2.edu.vn",
                  href: "mailto:6051071019@st.utc2.edu.vn",
                },
                {
                  icon: BsTelephoneFill,
                  value: "038 5981 196",
                  href: "tel:0385981196",
                },
                {
                  icon: FaMapMarkerAlt,
                  value:
                    "450-451 Lê Văn Việt, Phường Tăng Nhơn Phú A, Tp. Thủ Đức (Quận 9 cũ), TP. Hồ Chí Minh",
                  href: "tel:0385981196",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={index}
                    className="flex gap-4 hover:text-[var(--mainColor)] group"
                  >
                    <div className="w-8 h-8 border group-hover:border-[var(--mainColor)] border-white rounded-[50%] flex items-center justify-center">
                      <Icon />
                    </div>
                    <div className="flex-1">
                      {item.href ? (
                        <Link href={item.href}>{item.value}</Link>
                      ) : (
                        item.value
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <hr className="my-12" />
        <Flex className="justify-between">
          <Flex className="">
            <Link
              href="https://www.facebook.com/duydusk1"
              className="facebook opacity-70 bg-gray-700 p-3 rounded-md hover:bg-white hover:text-gray-700 hover:opacity-100"
              title="Facebook"
            >
              <ImFacebook />
            </Link>
            <Link
              href="https://www.instagram.com/duy_dev_22"
              className="instagram opacity-70 bg-gray-700 p-3 rounded-md hover:bg-white hover:text-gray-700 hover:opacity-100"
              title="Instagram"
            >
              <BsInstagram />
            </Link>
          </Flex>
          <div className="">
            Copyright &copy; 2023 Duy Phan. All rights reserved.
          </div>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
