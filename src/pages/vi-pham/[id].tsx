import violationApi from "@/api/violation.api";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import MainLayout from "@/components/layouts/MainLayout";
import Violation from "@/types/violation/Violation";

import { generateHref, generateHrefId } from "@/utils/helpers";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

type Props = {
  data: Violation;
};

const Page = (props: Props) => {
  const { query } = useRouter();
  const { id } = query;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Violation | null>(null);

  useEffect(() => {
    setLoading(true);
    if (id)
      violationApi
        .getById(`${id}`)
        .then((result) => {
          setData(result);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [id]);
  if (loading) return <Fragment>Loading...</Fragment>;
  if (!data) return <Fragment>Not found</Fragment>;
  return (
    <Fragment>
      <Head>
        <title>Thông tin vi phạm</title>
      </Head>
      <MainLayout>
        <div className="violation-detail">
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
        </div>
      </MainLayout>
    </Fragment>
  );
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
