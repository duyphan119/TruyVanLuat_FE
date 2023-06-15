import newsApi from "@/api/news.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Loading from "@/components/common/Loading";
import MainLayout from "@/components/layouts/MainLayout";
import useQueryString from "@/hooks/useQueryString";
import News from "@/types/news/News";
import IsNextResponse from "@/types/response/IsNextResponse";
import {
  DEFAULT_LIMIT,
  IS_NEXT_RESPONSE_EMPTY,
  PLACEHOLDER_THUMBNAIL,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import { createQueryString } from "@/utils/helpers";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  data: IsNextResponse<News>;
};

const Page = ({ data }: Props) => {
  const router = useRouter();

  const { getString } = useQueryString();
  const q = getString("q");

  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: { q },
  });

  const [newsData, setNewsData] = useState<IsNextResponse<News>>(data);
  const [page, setPage] = useState<number>(1);

  const fetchNewsData = async (params?: any, isReset?: boolean) => {
    try {
      const data = await newsApi.getAll({ ...params });
      setNewsData(
        isReset
          ? data
          : {
              ...data,
              rows: [...newsData.rows, ...data.rows],
            }
      );
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const qs = createQueryString({ ...values });
    router.push(`${PUBLIC_ROUTES.NEWS}${qs}`);
    fetchNewsData(values, true);
  };

  return (
    <Fragment>
      <Head>
        <title>Tất cả tin tức</title>
      </Head>
      <AuthNotFound>
        <MainLayout>
          <Container className="py-4">
            <Flex className="flex-col !items-start mt-2">
              <Breadcrumbs
                titleCenter={true}
                items={[
                  {
                    label: "Trang chủ",
                    href: PUBLIC_ROUTES.HOME,
                    hideSeparateAfter: true,
                  },
                ]}
                current="Tất cả tin tức"
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
              <InfiniteScroll
                dataLength={newsData.rows.length}
                next={() => {
                  fetchNewsData({ p: page + 1 });
                  setPage(page + 1);
                }}
                hasMore={newsData.isNext}
                className="flex flex-col gap-6 bg-white"
                loader={
                  <div className="overflow-hidden">
                    <Loading />
                  </div>
                }
              >
                {newsData.rows.map((row, index) => {
                  return (
                    <Fragment key={row.slug}>
                      {index > 0 ? <hr /> : null}
                      <article className="">
                        <Link
                          href={`${PUBLIC_ROUTES.NEWS}/${row.slug}`}
                          className={`group block`}
                          title={row.title}
                        >
                          <Flex className="!items-start">
                            <div className="relative w-[200px] pb-[10%]">
                              <Image
                                alt="thumbnail news"
                                src={row.thumbnail || PLACEHOLDER_THUMBNAIL}
                                priority={true}
                                sizes="(max-width: 500px) 100vw"
                                fill={true}
                              />
                            </div>
                            <div className="w-2/3">
                              <p className="font-medium group-hover:text-[var(--mainColor)]">
                                {row.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {row.description}
                              </p>
                            </div>
                          </Flex>
                        </Link>
                      </article>
                    </Fragment>
                  );
                })}
              </InfiniteScroll>
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
    const data = await newsApi.getAll({ ...context.query });
    return {
      props: { data },
    };
  } catch (error) {}
  return {
    props: {
      data: IS_NEXT_RESPONSE_EMPTY,
    },
  };
};

export default Page;
