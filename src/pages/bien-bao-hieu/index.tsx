import groupTrafficSignApi from "@/api/groupTrafficSign.api";
import trafficSignApi from "@/api/trafficSign.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";
import MainLayout from "@/components/layouts/MainLayout";
import useQueryString from "@/hooks/useQueryString";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import PaginationResponse from "@/types/response/PaginationResponse";
import TrafficSign from "@/types/trafficSign/TrafficSign";
import { PAGINATION_RESPONSE_EMPTY, PUBLIC_ROUTES } from "@/utils/constants";
import { createQueryString } from "@/utils/helpers";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  AiOutlineDown,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineUp,
} from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const { getString } = useQueryString();
  const q = getString("q");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginationResponse<GroupTrafficSign>>(
    PAGINATION_RESPONSE_EMPTY
  );
  console.log(data);
  const [activeData, setActiveData] = useState<boolean[]>([]);

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { q },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const qs = createQueryString({ ...values });
    router.push(`${PUBLIC_ROUTES.TRAFFIC_SIGNS}${qs}`);
  };

  const handleClick = (index: number) => {
    setActiveData(activeData.map((item, i) => (i === index ? !item : item)));
  };

  useEffect(() => {
    let isMounted = true;
    groupTrafficSignApi
      .getAll({
        keyword: q,
      })
      .then((resData) => {
        if (isMounted) {
          console.log(resData);
          setData(resData);
          setActiveData(new Array(resData.count).fill(true));
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [q]);

  return (
    <Fragment>
      <Head>
        <title>Biển báo hiệu giao thông</title>
      </Head>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <AuthNotFound>
          <MainLayout>
            <Container className="py-4">
              <Breadcrumbs
                items={[
                  {
                    label: "Trang chủ",
                    href: PUBLIC_ROUTES.HOME,
                    hideSeparateAfter: true,
                  },
                ]}
                titleCenter={true}
                current="Biển báo hiệu giao thông"
              />
              <form
                className="relative my-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  id="q"
                  className="border border-neutral-500 pr-2 py-2 pl-8 focus:border-transparent outline-neutral-500 rounded-sm w-full"
                  placeholder="Nhập từ khoá tìm kiếm"
                  {...register("q")}
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-2 text-neutral-500">
                  <FaSearch />
                </span>
              </form>
              <ul className="flex flex-col gap-4">
                {data.rows.map((row, index) => {
                  if (row.children && row.children.length > 0)
                    return (
                      <li key={index} id={row.id}>
                        <div
                          className="font-bold text-lg cursor-pointer select-none flex items-center justify-between hover:text-[var(--mainColor)]"
                          onClick={() => handleClick(index)}
                        >
                          <div className="flex items-center gap-2">
                            {activeData[index] ? (
                              <AiOutlineMinus />
                            ) : (
                              <AiOutlinePlus />
                            )}
                            <span>{row.name}</span>
                          </div>
                          <div>
                            {activeData[index] ? (
                              <AiOutlineUp />
                            ) : (
                              <AiOutlineDown />
                            )}
                          </div>
                        </div>
                        <div className="w-full h-[0.5px] my-1 bg-black"></div>
                        {activeData[index] ? (
                          <Fragment>
                            {row.effect ? (
                              <p>
                                {row.name} {row.effect}
                              </p>
                            ) : null}
                            {row.children && row.children.length > 0 ? (
                              <div className="grid lg:grid-cols-12 gap-4 mt-2">
                                {row.children?.map((child, idx) => {
                                  return (
                                    <div
                                      className="col-span-2"
                                      key={idx}
                                      title={`${child.code}: ${child.name}`}
                                    >
                                      <div
                                        className={`relative flex items-center overflow-hidden justify-center h-40 border border-neutral-500`}
                                      >
                                        <Image
                                          src={child.image}
                                          alt="thumbnail"
                                          priority={true}
                                          width="0"
                                          height="0"
                                          sizes="100vw"
                                          style={{
                                            width: "80px",
                                            height: "auto",
                                          }}
                                        />
                                      </div>
                                      <div className="mt-2 text-sm">
                                        {child.code}: {child.name}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </Fragment>
                        ) : null}
                      </li>
                    );
                  else return <Fragment key={index}></Fragment>;
                })}
              </ul>
            </Container>
          </MainLayout>
        </AuthNotFound>
      )}
    </Fragment>
  );
};

export default Page;
