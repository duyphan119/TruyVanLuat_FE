import vanbanApi from "@/api/vanban.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Pagination from "@/components/common/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import { createQueryString } from "@/utils/helpers";
import PaginationResponse from "@/types/response/PaginationResponse";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import textApi from "@/api/text.api";
import { FaSearch } from "react-icons/fa";
import signers from "@/dummyData/signers.json";
import textKinds from "@/dummyData/textKinds.json";
import issuingOrganizations from "@/dummyData/issuingOrganizations.json";
import statuses from "@/dummyData/statuses.json";
import Button from "@/components/common/Button";
import { GetServerSidePropsContext } from "next";

type Props = {
  data: PaginationResponse<VanBanCrawled>;
  // p: number;
};

const Page = ({ data }: Props) => {
  const router = useRouter();

  const { p } = router.query;
  const page = p ? +p : 1;

  const { register, handleSubmit } = useForm<FieldValues>();

  const { rows, count, total_pages } = data;

  const handlePageChange = (page: number) => {
    const qs = createQueryString({ ...router.query, p: page });
    router.push(`${PUBLIC_ROUTES.VANBAN}${qs}`);
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    const qs = createQueryString({ ...values, p: page });
    router.push(`${PUBLIC_ROUTES.VANBAN}${qs}`);
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   if (router.query) {
  //     console.log(router.query);
  //     vanbanApi
  //       .search(router.query)
  //       .then((res) => {
  //         isMounted && setData(res);
  //       })
  //       .catch((error) => {
  //         isMounted = false;
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });

  //     return () => {
  //       isMounted = false;
  //     };
  //   }
  // }, [router.query]);

  // useEffect(() => {
  //   Promise.all([
  //     textApi.getAreas(),
  //     textApi.getIssuingOrganizations(),
  //     textApi.getKinds(),
  //     textApi.getSigners(),
  //     textApi.getStatuses(),
  //     textApi.search(),
  //   ])
  //     .then(([res1, res2, res3, res4, res5, res6]) => {
  //       setAreas(res1);
  //       setIssuingOrganizations(res2);
  //       setKinds(res3);
  //       setSigners(res4);
  //       setStatuses(res5);
  //     })
  //     .catch((error) => {})
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>Tất cả văn bản</title>
      </Head>
      <AuthNotFound>
        <MainLayout>
          <Container className="py-4">
            <Flex className="flex-col !gap-4 !items-start">
              <Breadcrumbs
                items={[
                  {
                    href: PUBLIC_ROUTES.HOME,
                    label: "Trang chủ",
                    hideSeparateAfter: true,
                  },
                ]}
                current="Tất cả văn bản"
                titleCenter={true}
              />
              <div className="border border-neutral-500 p-4 w-full text-sm">
                <h1 className="text-2xl flex items-center justify-center mb-3 uppercase">
                  Bộ lọc tìm kiếm
                </h1>
                <form
                  className="w-full grid grid-cols-12 gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex gap-2 items-center col-span-6">
                    <label htmlFor="kwd" className="">
                      Từ khoá
                    </label>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        id="kwd"
                        className="border border-neutral-500 pr-2 py-2 pl-8 focus:border-transparent outline-neutral-500 rounded-sm w-full"
                        placeholder="Nhập từ khoá tìm kiếm"
                        {...register("kwd")}
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 left-2">
                        <FaSearch />
                      </span>
                    </div>
                  </div>
                  <div className="col-span-6 flex items-center gap-2">
                    <label htmlFor="cq" className="whitespace-nowrap">
                      Cơ quan ban hành
                    </label>
                    <select
                      id="cq"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("cq")}
                    >
                      <option value="">Cơ quan ban hành</option>
                      {issuingOrganizations
                        .splice(0, 50)
                        .map((issuingOrganization, index) => {
                          return (
                            <option key={index} value={issuingOrganization.UID}>
                              {issuingOrganization.Title}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label htmlFor="k" className="whitespace-nowrap">
                      Loại văn bản
                    </label>
                    <select
                      id="k"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("k")}
                    >
                      <option value="">Loại văn bản</option>
                      {textKinds.map((textKind, index) => {
                        return (
                          <option key={index} value={textKind.UID}>
                            {textKind.Title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label htmlFor="nk" className="whitespace-nowrap">
                      Người ký
                    </label>
                    <select
                      id="nk"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("nk")}
                    >
                      <option value="">Người ký</option>
                      {signers.map((signer, index) => {
                        return (
                          <option key={index} value={signer.UID}>
                            {signer.Title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <label htmlFor="tt" className="whitespace-nowrap">
                      Tình trạng hiệu lực
                    </label>
                    <select
                      id="tt"
                      className="border border-neutral-500 p-2 outline-neutral-500 rounded-sm w-full"
                      {...register("tt")}
                    >
                      <option value="">Tình trạng hiệu lực</option>
                      {statuses.map((status, index) => {
                        return (
                          <option key={index} value={status.UID}>
                            {status.Title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-12 text-center">
                    <Button title="Áp dụng" newCss={true} type="submit">
                      Áp dụng
                    </Button>
                  </div>
                </form>
              </div>
              <p className="text-right w-full">
                Tìm thấy <b>{data.count}</b> văn bản phù hợp
              </p>

              <div className="grid grid-cols-12 gap-y-6 gap-x-20 w-full relative before:absolute before:content-normal before:top-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-neutral-400">
                {rows.map((row) => {
                  return (
                    <div
                      key={row.slug}
                      title={row.tooltip}
                      className="col-span-6 grid grid-cols-12 gap-2 group"
                    >
                      <div className="col-span-8">
                        <Link
                          href={`${PUBLIC_ROUTES.VANBAN}${row.slug}`}
                          className="group-hover:text-[var(--mainColor)] font-medium three-dot three-dot-2"
                        >
                          {row.title}
                        </Link>
                        <p className="text-sm mt-1 inline-block text-gray-500 three-dot three-dot-3">
                          {row.description}
                        </p>
                      </div>
                      <div className="col-span-4 text-sm">
                        <p>
                          Ban hành:{" "}
                          <span className="float-right">{row.issue}</span>
                        </p>
                        <p>
                          Ngày hiệu lực:{" "}
                          <span className="float-right">
                            {row.effectiveDate || "..."}
                          </span>
                        </p>
                        <p>
                          Hiệu lực:{" "}
                          <span className="float-right">{row.status}</span>
                        </p>
                        {row.expiredDate ? (
                          <p>
                            Ngày hết hiệu lực:{" "}
                            <span className="float-right">
                              {row.expiredDate}
                            </span>
                          </p>
                        ) : null}
                        <p>
                          Cập nhật:{" "}
                          {(() => {
                            const splitUpdated = row.updated.split("(");
                            if (splitUpdated.length > 1) {
                              return (
                                <span className="float-right">
                                  {splitUpdated[0]} <br />
                                  {"(" + splitUpdated[1]}
                                </span>
                              );
                            }
                            return (
                              <span className="float-right">{row.updated}</span>
                            );
                          })()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {count > 0 ? (
                <div className="w-full mt-6">
                  <Pagination
                    className="w-full"
                    listDotsClassName="justify-center"
                    totalPages={total_pages}
                    current={page}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : null}
            </Flex>
          </Container>
        </MainLayout>
      </AuthNotFound>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const data = await vanbanApi.search(context.query);
    return { props: { data } };
  } catch (error) {}
  return { notFound: true };
};

export default Page;
