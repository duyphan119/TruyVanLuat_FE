import groupTrafficSignApi from "@/api/groupTrafficSign.api";
import trafficSignApi from "@/api/trafficSign.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";
import MainLayout from "@/components/layouts/MainLayout";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import PaginationResponse from "@/types/response/PaginationResponse";
import TrafficSign from "@/types/trafficSign/TrafficSign";
import { PAGINATION_RESPONSE_EMPTY, PUBLIC_ROUTES } from "@/utils/constants";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import {
  AiOutlineDown,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineUp,
} from "react-icons/ai";

type Props = {};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginationResponse<GroupTrafficSign>>(
    PAGINATION_RESPONSE_EMPTY
  );
  const [activeData, setActiveData] = useState<boolean[]>([]);

  const handleClick = (index: number) => {
    setActiveData(activeData.map((item, i) => (i === index ? !item : item)));
  };

  useEffect(() => {
    let isMounted = true;
    groupTrafficSignApi
      .getAll()
      .then((resData) => {
        if (isMounted) {
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
  }, []);

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
              <ul className="flex flex-col gap-4">
                {data.rows.map((row, index) => {
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
                          <div className="grid lg:grid-cols-12 gap-4 mt-2">
                            {row.children?.map((child, idx) => {
                              return (
                                <div
                                  className="col-span-2"
                                  key={idx}
                                  title={`${child.code}: ${child.name}`}
                                >
                                  <div
                                    className={`relative flex items-center justify-center h-40 border border-neutral-500`}
                                  >
                                    <Image
                                      src={child.image}
                                      alt="thumbnail"
                                      priority={true}
                                      width="0"
                                      height="0"
                                      sizes="100vw"
                                      style={{ width: "80px", height: "auto" }}
                                    />
                                  </div>
                                  <div className="mt-2 text-sm">
                                    {child.code}: {child.name}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Fragment>
                      ) : null}
                    </li>
                  );
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