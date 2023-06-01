import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { BsNewspaper } from "react-icons/bs";
import { RiQuestionnaireLine } from "react-icons/ri";
import { VscLaw } from "react-icons/vsc";
import Container from "./common/Container";

type Props = {};

const SectionHomeTopics = (props: Props) => {
  return (
    <section className="section-topics bg-[#f9f9f9] py-20">
      <Container className="mt-14">
        <h2 className="text-[50px] text-center px-3 mb-5 font-thin">
          Tra cứu theo chủ đề
        </h2>
        <h3 className="text-xl text-center px-6 mb-40 font-thin w-[72%] mx-auto">
          Khi bạn bị mắc kẹt trong một vấn đề nào đó, đừng lãng phí thời gian
          của bạn, hãy để chúng tôi biết, chúng tôi ở đây để giúp bạn
        </h3>
      </Container>
      <Container>
        <ul className="topics grid gap-8 grid-cols-12">
          {[
            {
              title: "Văn bản luật",
              color: "#8966c3",
              description:
                "Bạn có thể xem văn bản về luật giao thông đường bộ mới nhất",
              href: PUBLIC_ROUTES.VANBAN,
              icon: VscLaw,
            },
            {
              title: "Tin tức giao thông",
              color: "#de693d",
              description: "Bạn có thể xem các tin tức về giao thông đường bộ",
              href: PUBLIC_ROUTES.NEWS,
              icon: BsNewspaper,
            },
            {
              title: "Chatbot hỗ trợ tra cứu",
              color: "#27c88d",
              description:
                "Bạn có thể trò chuyện với bot để tra cứu các thông tin về luật giao thông đường bộ",
              href: PUBLIC_ROUTES.CHAT,
              icon: RiQuestionnaireLine,
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                className="topic lg:col-span-4 col-span-12 flex flex-col items-center p-10 bg-white relative group mt-14"
                key={index}
                style={{
                  color: item.color,
                  border: `1px solid currentColor`,
                }}
              >
                <div className="circle transition-all duration-500 absolute left-1/2 -translate-x-1/2 top-0 w-32 h-32 border rotate-45 -translate-y-1/2 bg-white rounded-[50%] border-b-transparent border-r-transparent border-t-[currentColor] border-l-[currentColor] group-hover:border-t-transparent group-hover:border-l-transparent group-hover:border-b-[currentColor] group-hover:border-r-[currentColor] flex items-center justify-center">
                  <Icon className="-rotate-45 text-6xl" />
                </div>
                <h4 className="title text-2xl mb-6 mt-24 font-semibold text-neutral-800 text-center">
                  {item.title}
                </h4>
                <div className="width-home mb-6 h-[2px] bg-[currentColor]"></div>
                <p className="description three-dot three-dot-3 my-12 text-center h-[72px] text-neutral-400">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className={`view-detail flex items-center gap-2 hover:text-[currentColor] text-neutral-600 font-medium`}
                >
                  Xem chỉ tiết
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default SectionHomeTopics;
