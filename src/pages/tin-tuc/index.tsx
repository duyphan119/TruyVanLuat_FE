import newsApi from "@/api/news.api";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Loading from "@/components/common/Loading";
import MainLayout from "@/components/layouts/MainLayout";
import News from "@/types/news/News";
import IsNextResponse from "@/types/response/IsNextResponse";
import {
  DEFAULT_LIMIT,
  IS_NEXT_RESPONSE_EMPTY,
  PLACEHOLDER_THUMBNAIL,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  data: IsNextResponse<News>;
};

const Page = ({ data }: Props) => {
  const [newsData, setNewsData] = useState<IsNextResponse<News>>(data);
  const [page, setPage] = useState<number>(1);

  const fetchNewsData = async (p?: number, limit?: number) => {
    try {
      const data = await newsApi.getAll({ page: p, limit });
      setNewsData({
        ...data,
        rows: [...newsData.rows, ...data.rows],
      });
    } catch (error) {}
  };

  return (
    <Fragment>
      <Head>
        <title>Tất cả tin tức</title>
      </Head>
      <MainLayout>
        <Container className="py-2">
          <Flex className="flex-col !items-start mt-2">
            <Breadcrumbs
              titleCenter={true}
              items={[
                {
                  label: "Trang chủ",
                  href: PUBLIC_ROUTES.HOME,
                  hideSeperateAfter: true,
                },
              ]}
              current="Tất cả tin tức"
            />
            <InfiniteScroll
              dataLength={newsData.rows.length}
              next={() => {
                fetchNewsData(page + 1, DEFAULT_LIMIT);
                setPage(page + 1);
              }}
              hasMore={newsData.isNext}
              className="flex flex-col gap-4 bg-white"
              loader={
                <div className="overflow-hidden">
                  <Loading />
                </div>
              }
            >
              {newsData.rows.map((row, index) => {
                return (
                  <article key={row.slug} className="border border-neutral-200">
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
                );
              })}
            </InfiniteScroll>
          </Flex>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const data = await newsApi.getAll({ limit: DEFAULT_LIMIT });
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
