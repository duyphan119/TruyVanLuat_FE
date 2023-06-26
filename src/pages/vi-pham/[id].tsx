import violationApi from "@/api/violation.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import MainLayout from "@/components/layouts/MainLayout";
import Violation from "@/types/violation/Violation";
import { PUBLIC_ROUTES } from "@/utils/constants";
import { generateHrefId } from "@/utils/helpers";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

type Props = {
  // data: Violation;
};

const Page = (props: Props) => {
  const { query } = useRouter();
  const { id } = query;

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    if (id)
      Promise.allSettled([
        violationApi.getById(`${id}`),
        violationApi.getRelated(`${id}`),
      ])
        .then(([res1, res2]) => {
          if (res1.status === "fulfilled") {
            setData(res1.value);
          }
          if (res2.status === "fulfilled") {
            setRelated(res2.value);
          }
        })
        .finally(() => {
          setLoading(false);
        });
  }, [id]);
  if (!data) {
    if (loading) return <Loading fullScreen={true} />;
    if (!loading)
      return (
        <Fragment>
          <NotFound />
        </Fragment>
      );
  } else {
    console.log(data);
    return (
      <Fragment>
        <Head>
          <title>Thông tin vi phạm</title>
        </Head>
        <AuthNotFound>
          <MainLayout>
            <Container className="py-4">
              <Breadcrumbs
                items={[
                  {
                    href: PUBLIC_ROUTES.HOME,
                    label: "Trang chủ",
                    hideSeparateAfter: true,
                  },
                ]}
                titleCenter={true}
                current="Vi phạm"
              />
              <p className="mt-1 text-neutral-700">
                Đối tượng xử phạt: {data.violator}
              </p>
              <p className="font-bold">{data.name}</p>
              <p className="mt-1 text-rose-500">{data.fine}</p>
              <p className="mt-1">
                <Link
                  href={`${PUBLIC_ROUTES.NGHI_DINH}#${generateHrefId(
                    data.legal
                  )}`}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  Xem chi tiết {data.legal}
                </Link>
              </p>
              {data.addition_punishment ? (
                <div>
                  <div className="h-[1px] my-3 w-full bg-neutral-300"></div>
                  <p className="flex items-center gap-2 font-bold">
                    <MdOutlineSubdirectoryArrowRight />
                    Phạt bổ sung:
                  </p>
                  <ul>
                    {data.addition_punishment
                      .split(" ; ")
                      .map((text: string) => {
                        return <li key={text}>{text}</li>;
                      })}
                  </ul>
                  <ul>
                    {data.addition_punishment_legal
                      .split(" và ")
                      .map((text: string) => {
                        const hrefId = generateHrefId(text);
                        return (
                          <li key={text}>
                            <Link
                              href={`${PUBLIC_ROUTES.NGHI_DINH}#${hrefId}`}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                            >
                              Xem chi tiết {text}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ) : null}
              {data.solution ? (
                <div>
                  <div className="h-[1px] my-3 w-full bg-neutral-300"></div>
                  <p className="flex items-center gap-2 font-bold">
                    <MdOutlineSubdirectoryArrowRight />
                    Biện pháp khắc phục:
                  </p>
                  <ul>
                    {data.solution.split(" ; ").map((text: string) => {
                      return <li key={text}>{text}</li>;
                    })}
                  </ul>
                  <ul>
                    {data.solution_legal.split(" và ").map((text: string) => {
                      const hrefId = generateHrefId(text);
                      return (
                        <li key={text}>
                          <Link
                            href={`${PUBLIC_ROUTES.NGHI_DINH}#${hrefId}`}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                          >
                            Xem chi tiết {text}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
              {related.length > 0 ? (
                <Fragment>
                  <div className="h-[1px] my-3 w-full bg-neutral-300"></div>
                  <p className="flex items-center gap-2 font-bold">
                    <AiFillCaretRight /> Hành vi liên quan
                  </p>
                  <ul>
                    {related.map((item) => {
                      return (
                        <li key={item.id}>
                          <p className="mt-1 text-neutral-700">
                            Đối tượng xử phạt: {item.violator}
                          </p>
                          <p className="font-bold">{item.name}</p>
                          <p className="mt-1 text-rose-500">{item.fine}</p>
                          <p className="mt-1">
                            <Link
                              href={`${PUBLIC_ROUTES.NGHI_DINH}#${item.id}`}
                              className="text-blue-500 hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  window.location.origin +
                                    PUBLIC_ROUTES.NGHI_DINH +
                                    "#" +
                                    generateHrefId(item.legal)
                                );
                              }}
                            >
                              Xem chi tiết {item.legal}
                            </Link>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              ) : null}
              {/* {data.note ? (
                <Fragment>
                  <div className="w-full h-[1px] bg-neutral-300 my-3"></div>
                  <p className="flex items-center gap-2 font-bold">
                    <AiFillCaretRight /> Hình phạt bổ sung:
                  </p>
                </Fragment>
              ) : null}
              {data.addition_punishments.length > 0 ? (
                <Fragment>
                  <div className="w-full h-[1px] bg-neutral-300 my-3"></div>
                  <p className="flex items-center gap-2 font-bold">
                    <MdOutlineSubdirectoryArrowRight /> Hình phạt bổ sung:
                  </p>
                  <ul>
                    {data.addition_punishments.map((item, index) => {
                      return (
                        <li key={index}>
                          <p className="first-letter:uppercase">
                            {item.content}
                          </p>
                          <p className="mt-1">
                            <Link
                              href={`${PUBLIC_ROUTES.NGHI_DINH}#${data.id}`}
                              className="text-blue-500 hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  window.location.origin +
                                    PUBLIC_ROUTES.NGHI_DINH +
                                    "#" +
                                    item.id
                                );
                              }}
                            >
                              Xem chi tiết {item.legal}
                            </Link>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              ) : null}
              {data.solutions.length > 0 ? (
                <Fragment>
                  <div className="w-full h-[1px] bg-neutral-300 my-3"></div>
                  <p className="flex items-center gap-2 font-bold">
                    <MdOutlineSubdirectoryArrowRight size={24} /> Biện pháp khắc
                    phục:
                  </p>
                  <ul>
                    {data.solutions.map((item, index) => {
                      return (
                        <li key={index}>
                          <p className="first-letter:uppercase">
                            {item.content}
                          </p>
                          <p className="mt-1">
                            <Link
                              href={`${PUBLIC_ROUTES.NGHI_DINH}#${data.id}`}
                              className="text-blue-500 hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  window.location.origin +
                                    PUBLIC_ROUTES.NGHI_DINH +
                                    "#" +
                                    item.id
                                );
                              }}
                            >
                              Xem chi tiết {item.legal}
                            </Link>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              ) : null} */}
            </Container>
            {/* <Container className="py-4">
            <p className="text-center font-bold">{data.legal.name}</p>
            <p className="uppercase">
              Chương {data.legal.chapter.num}. {data.legal.chapter.name}
            </p>
            <p className="uppercase">
              Mục {data.legal.section.num}. {data.legal.section.name}
            </p>
            <p className="">
              Điều {data.legal.article.num}. {data.legal.article.name}
            </p>
            <p className="">
              {data.legal.clause.num}. {data.legal.clause.name}
            </p>
            <p className="">
              {data.legal.point.num}. {data.legal.point.name}
            </p>
          </Container> */}
            {/* <div className="violation-detail">
          <Container>
            <div className="">Đối tượng: {data.apply_for}</div>
            <div className="font-bold mt-2 text-lg">{data.content}</div>
            <div className="text-red-500 my-1">{data.punishment}</div>
            <Flex className="flex-col text-sm mt-1 !items-start !gap-0">
              {data.detail?.split(" và ").map((text, index) => {
                return (
                  <Flex className="!gap-1" key={index}>
                    <span className="">Xem chi tiết:</span>
                    <Link
                      target="_blank"
                      href={generateHref(text)}
                      className=" underline text-blue-500 hover:text-blue-600"
                    >
                      {text}
                    </Link>
                  </Flex>
                );
              })}
            </Flex>
            {data.updated_punishment_detail ? (
              <Flex className="flex-col text-sm !items-start !gap-0">
                {data.updated_punishment_detail
                  .split(" và ")
                  .map((text, index) => {
                    return (
                      <Flex className="!gap-1" key={index}>
                        <span className="text-red-500">Sửa đổi bởi:</span>
                        <Link
                          target="_blank"
                          href={generateHref(text)}
                          className=" underline text-blue-500 hover:text-blue-600"
                        >
                          {text}
                        </Link>
                      </Flex>
                    );
                  })}
              </Flex>
            ) : null}
            {data.added_punishment ? (
              <Fragment>
                <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                <div className="">
                  <div className="font-bold">Hình thức phạt bổ sung</div>
                  {data.added_punishment?.split(" ; ").map((text, index) => (
                    <p className="" key={index}>
                      {text}
                    </p>
                  ))}
                  {data.added_punishment_detail !== ""
                    ? data.added_punishment_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-sm !gap-1" key={index}>
                            <span>Xem chi tiết:</span>
                            <Link
                              key={index}
                              target="_blank"
                              href={generateHref(text)}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                  {data.updated_added_punishment_detail !== ""
                    ? data.updated_added_punishment_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-sm !gap-1">
                            <span className="text-red-500">Sửa đổi bởi:</span>
                            <Link
                              key={index}
                              target="_blank"
                              href={generateHref(text)}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                </div>
              </Fragment>
            ) : null}
            {data.solution ? (
              <Fragment>
                <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                <div className="">
                  <div className="font-bold">Biện pháp khắc phục</div>
                  {data.solution?.split(" ; ").map((text, index) => (
                    <p className="" key={index}>
                      {text}
                    </p>
                  ))}
                  {data.solution_detail !== ""
                    ? data.solution_detail?.split(" và ").map((text, index) => (
                        <Flex className="text-sm !gap-1">
                          <span>Xem chi tiết:</span>
                          <Link
                            key={index}
                            target="_blank"
                            href={generateHref(text)}
                            className="underline text-blue-500 block"
                          >
                            {text}
                          </Link>
                        </Flex>
                      ))
                    : null}
                  {data.updated_solution_detail !== ""
                    ? data.updated_solution_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-sm !gap-1">
                            <span className="text-red-500">Sửa đổi bởi:</span>
                            <Link
                              key={index}
                              target="_blank"
                              href={generateHref(text)}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                </div>
              </Fragment>
            ) : null}
            {data.note ? (
              <Fragment>
                <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                <div className="">
                  <div className="font-bold">Ghi chú</div>
                  {data.note.split(" ; ").map((text, index) => (
                    <p className="" key={index}>
                      {text}
                    </p>
                  ))}
                  {data.note_detail !== ""
                    ? data.note_detail?.split(" và ").map((text, index) => (
                        <Flex className="text-sm !gap-1">
                          <span>Xem chi tiết:</span>
                          <Link
                            key={index}
                            target="_blank"
                            href={generateHref(text)}
                            className="underline text-blue-500 block"
                          >
                            {text}
                          </Link>
                        </Flex>
                      ))
                    : null}
                </div>
              </Fragment>
            ) : null}
          </Container>
        </div> */}
          </MainLayout>
        </AuthNotFound>
      </Fragment>
    );
  }
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { id } = context.query;
//   try {
//     // const api = new API("http://localhost:5000");
//     if (id) {
//       const { data } = await axios.get(`http://localhost:5000/violation/${id}`);
//       return { props: { data } };
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return { notFound: true };
// };

export default Page;
