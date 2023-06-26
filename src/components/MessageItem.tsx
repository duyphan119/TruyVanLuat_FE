import Image from "next/image";
import React from "react";
import moment from "moment";
import Message from "@/types/message/Message";
import useUserStore from "@/zustand/userStore";

type Props = {
  message: any;
};

const MessageItem = ({ message }: Props) => {
  const { profile } = useUserStore();
  return (
    <div className="">
      <div
        className={`flex gap-2 ${
          message.is_sender ? "ml-auto text-right flex-row-reverse" : ""
        }`}
      >
        <div
          className=""
          title={
            message.is_sender ? (profile ? profile.full_name : "User") : "Bot"
          }
        >
          <Image
            alt="avatar"
            src={`/images/${
              message.is_sender ? "placeholder.jpg" : "bot-icon.png"
            }`}
            width={40}
            height={40}
            priority={true}
            className="rounded-[50%]"
          />
        </div>
        <div className="flex-1">
          <div className="text-[12px] mb-1">
            {moment(message.created_at).format("MM/DD/YYYY h:mm:ss A")}
          </div>
          <div
            className="p-2 px-3 bg-neutral-200 rounded-lg inline-block font-light"
            dangerouslySetInnerHTML={{
              __html: message.content,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
