import violationApi from "@/api/violation.api";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import useQueryString from "@/hooks/useQueryString";
import Infringe from "@/types/infringe/Infringe";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import { DEFAULT_LIMIT, PAGINATION_RESPONSE_EMPTY } from "@/utils/constants";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Fragment, useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";
import { io } from "socket.io-client";
const socket = io(`${process.env.LAWS_API}`);

type Recommend = {
  id: string;
  content: string;
};

const recommendList: Recommend[] = [
  {
    id: "1",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "2",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "3",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "4",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "5",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "6",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "7",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "8",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
  {
    id: "9",
    content: "Vượt đèn đỏ có bị phạt không?",
  },
];

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  createdAt: string;
};

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
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

  return (
    <Fragment>
      <Head>
        <title>Trò chuyện</title>
      </Head>
      <MainLayout>
        <div className="home">
          <Container className="py-2">
            <div
              style={{ height: "calc(100vh - 80px)" }}
              className="box relative flex flex-col border border-indigo-500"
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
                            className="text-center bg-gray-200 rounded-sm p-2 cursor-pointer hover:bg-gray-300"
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
                            className="text-center bg-gray-200 rounded-sm p-2 cursor-pointer hover:bg-gray-300"
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
                            <div className="">
                              <div className="text-[12px] mb-1">
                                {moment(message.createdAt).format(
                                  "MM/DD/YYYY h:mm:ss A"
                                )}
                              </div>
                              <div
                                className="p-2 bg-indigo-500 rounded-lg text-white inline-block"
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
                className="flex items-center p-3 border-t border-t-indigo-500 gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="search"
                  className="outline-none flex-1 p-2 text-sm bg-inherit border hover:border-indigo-500 focus:border-indigo-500"
                  placeholder="Hỏi tôi điều gì đó về luật giao thông đường bộ..."
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
    </Fragment>
  );
}
