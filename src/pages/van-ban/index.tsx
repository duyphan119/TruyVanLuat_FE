import vanbanApi from "@/api/vanban.api";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Pagination from "@/components/common/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import PaginationResponse from "@/types/response/PaginationResponse";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import { PUBLIC_ROUTES } from "@/utils/constants";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

type Props = {
  data: PaginationResponse<VanBanCrawled>;
  p: number
};

const Page = ({ data, p }: Props) => {
  const router = useRouter();

  const { rows, count, total_pages } = data;

  const handlePageChange = (page: number) => {
    router.push("?p="+page)
  };

  return (
    <Fragment>
      <Head>
        <title>Tất cả văn bản</title>
      </Head>
      <MainLayout>
        <Container className="py-4">
          <Flex className="flex-col !gap-4 !items-start">
            <h1 className="text-center">Tất cả văn bản</h1>
            {data.count}
            <Flex className="flex-col !gap-4 !items-start">
              {rows.map(({ title, slug, issue }) => {
                return (
                  <Link
                    href={`${PUBLIC_ROUTES.VANBAN}/${slug}`}
                    key={slug}
                    title={title}
                  >
                    <p className="hover:text-indigo-500 font-medium three-dot three-dot-2">
                      {title}
                    </p>
                    <p className="text-sm mt-1 inline-block text-gray-500">
                      Ban hành: {issue}
                    </p>
                  </Link>
                );
              })}
              <Pagination
              className="w-full"
              listDotsClassName="justify-center"
                totalPages={total_pages}
                current={p}
                onPageChange={handlePageChange}
              />
            </Flex>
          </Flex>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { p } = context.query;
  try {
    const page = p ? +p : 1
    const data = await vanbanApi.getAll(page);
    return { props: { data, p: page } };
  } catch (error) {}
  return { notFound: true };
};

export default Page;
