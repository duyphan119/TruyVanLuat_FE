import violationApi from "@/api/violation.api";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import useQueryString from "@/hooks/useQueryString";
import Infringe from "@/types/infringe/Infringe";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import {
  DEFAULT_LIMIT,
  HEADER_HEIGHT,
  PAGINATION_RESPONSE_EMPTY,
} from "@/utils/constants";
import axios from "axios";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Fragment, useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";
import diems from "@/jsons/vanban.json";
import { io } from "socket.io-client";
import { data1 } from "@/jsons/create";
import Loading from "@/components/common/Loading";
const socket = io(`${process.env.LAWS_API}`);

type Recommend = {
  id: string;
  content: string;
};

const recommendList: Recommend[] = [
  {
    id: "1",
    content: "Quy định về tốc độ giới hạn trên đường bộ là gì?",
  },
  {
    id: "2",
    content:
      "Luật giao thông có quy định về việc đeo dây an toàn khi lái xe không?",
  },
  {
    id: "3",
    content: "Xác định các quy tắc và biển báo đường bộ phổ biến.",
  },
  {
    id: "4",
    content:
      "Điều kiện về quyền ưu tiên của xe ưu tiên khi tham gia giao thông đường bộ.",
  },
  {
    id: "5",
    content: "Quy định về việc sử dụng điện thoại di động khi lái xe.",
  },
  {
    id: "6",
    content: "Luật giao thông liên quan đến việc vượt xe khác trên đường.",
  },
  {
    id: "7",
    content: "Quy định về việc chấp hành tín hiệu đèn giao thông.",
  },
  {
    id: "8",
    content: "Đường cao tốc là gì",
  },
  {
    id: "9",
    content: "Luật giao thông về việc dừng và đỗ xe đúng quy định.",
  },
];

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  createdAt: string;
};

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  const chatRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, setValue } = useForm();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatEmpty, setIsChatEmpty] = useState<boolean>(
    messages.length === 0
  );

  useEffect(() => {
    socket.on("bot-answer", (content: string) => {
      const dateString = new Date().toISOString();
      setMessages((state) => {
        if (state.length > 0 && state[state.length - 1].isUser)
          return [
            ...state,
            {
              content,
              id: dateString,
              createdAt: dateString,
              isUser: false,
            },
          ];
        return state;
      });
    });
  }, [socket]);

  const sendMessage = (content: string) => {
    socket.emit("user-send-message", content);
    const dateString = new Date().toISOString();
    setValue("keyword", "");
    setMessages([
      ...messages,
      {
        content,
        id: dateString,
        createdAt: dateString,
        isUser: true,
      },
    ]);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { keyword } = values;
    sendMessage(keyword);
  };

  useEffect(() => {
    setIsChatEmpty(messages.length === 0);
  }, [messages]);

  const handleClickRecommend = (recommend: Recommend) => {
    sendMessage(recommend.content);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const test = async () => {
      // await axios.post("http://localhost:5000/violations/many", []);
      await axios.post("http://localhost:5000/solutions/many", data1);
    };
    // test();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 1111);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Trò chuyện</title>
      </Head>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <MainLayout hideFooter={true}>
          <div className="bg-[#f9f9f9] py-4">
            <Container className="bg-white">
              <div
                style={{ height: `calc(100vh - ${HEADER_HEIGHT + 32}px)` }}
                className="box relative flex flex-col border border-[var(--mainColor)]"
              >
                <div
                  className="chat flex-1 relative overflow-x-hidden overflow-y-auto"
                  ref={chatRef}
                >
                  {isChatEmpty && recommendList.length > 0 ? (
                    <div className="flex flex-col items-center justify-center h-full w-1/2 mx-auto">
                      <div className="text-center mb-4 text-2xl">
                        Gợi ý câu hỏi
                      </div>
                      <div className="grid grid-cols-1 md:hidden gap-4">
                        {[...recommendList].splice(0, 3).map((recommend) => {
                          return (
                            <div
                              key={recommend.id}
                              className="flex items-center justify-center text-center bg-gray-200 rounded-sm p-2 cursor-pointer hover:bg-gray-300"
                              onClick={() => handleClickRecommend(recommend)}
                            >
                              "{recommend.content}"
                            </div>
                          );
                        })}
                      </div>
                      <div className="md:grid md:grid-cols-3 hidden gap-4">
                        {recommendList.map((recommend) => {
                          return (
                            <div
                              key={recommend.id}
                              className="flex items-center justify-center text-center bg-gray-200 rounded-sm p-2 cursor-pointer hover:bg-gray-300"
                              onClick={() => handleClickRecommend(recommend)}
                            >
                              "{recommend.content}"
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 p-3">
                      {messages.map((message) => {
                        return (
                          <div key={message.id} className="">
                            <div
                              className={`flex gap-2 ${
                                message.isUser
                                  ? "ml-auto text-right flex-row-reverse"
                                  : ""
                              }`}
                            >
                              <div className="">
                                <Image
                                  alt="avatar"
                                  src={`/images/${
                                    message.isUser
                                      ? "placeholder.jpg"
                                      : "bot-icon.png"
                                  }`}
                                  width={40}
                                  height={40}
                                  priority={true}
                                  className="rounded-[50%]"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-[12px] mb-1">
                                  {moment(message.createdAt).format(
                                    "MM/DD/YYYY h:mm:ss A"
                                  )}
                                </div>
                                <div
                                  className="p-2 bg-[var(--mainColor)] rounded-lg text-white inline-block"
                                  dangerouslySetInnerHTML={{
                                    __html: message.content,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <form
                  className="flex items-center p-3 border-t border-t-[var(--mainColor)] gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="search"
                    className="outline-none flex-1 p-2 text-sm bg-inherit border hover:border-[var(--mainColor)] focus:border-[var(--mainColor)] rounded-sm"
                    placeholder="Hỏi tôi điều gì đó về luật giao thông đường bộ..."
                    autoComplete="off"
                    {...register("keyword")}
                  />
                  <Button className="self-stretch" type="submit">
                    <BsSendFill />
                  </Button>
                </form>
              </div>
            </Container>
          </div>
        </MainLayout>
      )}
    </Fragment>
  );
}
