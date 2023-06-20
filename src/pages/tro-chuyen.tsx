import messageApi from "@/api/message.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";
import ChatForm from "@/components/form/ChatForm";
import MainLayout from "@/components/layouts/MainLayout";
import MessageItem from "@/components/MessageItem";
import RecommendQuestions from "@/components/RecommendQuestions";
import Message from "@/types/message/Message";
import RecommendQuestion from "@/types/recommendQuestion/RecommendQuestion";
import { HEADER_HEIGHT } from "@/utils/constants";
import useUserStore from "@/zustand/userStore";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const recommendList: RecommendQuestion[] = [
  {
    id: 1,
    content: "Lỗi không xi nhan bị phạt bao nhiêu ?",
  },
  {
    id: 2,
    content: "Xe thô sơ là gì ?",
  },
  {
    id: 3,
    content:
      "Chuyển hướng không nhường quyền đi trước cho người đi bộ thì bị phạt gì",
  },
  {
    id: 4,
    content: "Không chấp hành hiệu lệnh của biển báo hiệu có bị sao không ?",
  },
  {
    id: 5,
    content: "Các vi phạm về đèn đỏ đối với xe thô sơ là gì",
  },
  {
    id: 6,
    content: "Nếu tôi chuyển làn đường không có tín hiệu báo trước thì bị gì",
  },
  {
    id: 7,
    content: "Liệt kê các vi phạm đối với xe lăn của người khuyết tật",
  },
  {
    id: 8,
    content: "Đường cao tốc là gì",
  },
  {
    id: 9,
    content: "Vượt đèn đỏ thì bị phạt gì ?",
  },
];

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);

  const chatRef = useRef<HTMLDivElement | null>(null);

  const [socket, setSocket] = useState<any | null>(null);
  const { profile } = useUserStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatEmpty, setIsChatEmpty] = useState<boolean>(false);
  const [roomId, setRoomId] = useState("");

  console.log(roomId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await messageApi.getAll();
        setMessages(data);
        setIsChatEmpty(data.length === 0);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (roomId === "") {
      const id = profile
        ? profile.id
        : "" + (Math.floor(Math.random() * 10000) + new Date().getTime());
      setRoomId(id);
    }
  }, [profile, roomId]);

  useEffect(() => {
    if (socket && roomId !== "") {
      socket.emit("join-room", roomId);
    }
  }, [roomId]);

  useEffect(() => {
    const s = io(`${process.env.LAWS_API}`);

    s.on("bot-answer", (message: string) => {
      const dateString = new Date().toISOString();
      setMessages((state) => {
        if (state.length > 0 && state[state.length - 1].user_id !== "")
          return [
            ...state,
            {
              content: message,
              id: dateString,
              created_at: dateString,
              // user_id: "",
              // entities: [],
              // intent: "",
              // updated_at: dateString,
            },
          ];
        return state;
      });
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const sendMessage = (content: string) => {
    // if (profile) {
    //   messageApi
    //     .createOne({ content })
    //     .then((res) => {
    //       setMessages([...messages, res]);
    //     })
    //     .catch((error) => console.log(error))
    //     .finally(() => {
    //       socket.emit("send-message", { roomId, message: content });
    //     });
    // } else {
    const dateString = new Date().toISOString();
    setMessages([
      ...messages,
      {
        content,
        id: dateString,
        created_at: dateString,
        user_id: roomId,
        // entities: [],
        // intent: "",
        // updated_at: dateString,
      },
    ]);
    socket.emit("send-message", { roomId, message: content });
    // }
  };

  useEffect(() => {
    setIsChatEmpty(messages.length === 0);
  }, [messages]);

  const handleClickRecommend = (recommend: RecommendQuestion) => {
    sendMessage(recommend.content);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }
  }, [messages]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 543);

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
        <AuthNotFound>
          <MainLayout hideFooter={true} contentClassName="bg-[#f9f9f9]">
            <Container className="bg-white py-4">
              <div
                style={{ height: `calc(100vh - ${HEADER_HEIGHT + 32}px)` }}
                className="box relative flex flex-col border border-[var(--mainColor)]"
              >
                <div
                  className="chat flex-1 relative overflow-x-hidden overflow-y-auto"
                  ref={chatRef}
                >
                  {isChatEmpty && recommendList.length > 0 ? (
                    <RecommendQuestions
                      recommendQuestions={recommendList}
                      onClick={handleClickRecommend}
                    />
                  ) : (
                    <div className="flex flex-col gap-3 p-3">
                      {messages.map((message) => {
                        return (
                          <MessageItem key={message.id} message={message} />
                        );
                      })}
                    </div>
                  )}
                </div>
                <ChatForm onSend={sendMessage} />
              </div>
            </Container>
          </MainLayout>
        </AuthNotFound>
      )}
    </Fragment>
  );
}
