import vanbanApi from "@/api/vanban.api";
import AuthLogin from "@/components/auth/AuthLogin";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Pagination from "@/components/common/Pagination";
import MainLayout from "@/components/layouts/MainLayout";
import { violationData } from "@/jsons/violation.dummy";
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
  p: number;
};

const Page = ({ data, p }: Props) => {
  const router = useRouter();

  const { rows, count, total_pages } = data;

  const handlePageChange = (page: number) => {
    router.push("?p=" + page);
  };

  return (
    <Fragment>
      <Head>
        <title>Tất cả văn bản</title>
      </Head>
      <AuthLogin>
        <MainLayout>
          <Container className="py-4">
            <Flex className="flex-col !gap-4 !items-start">
              <Breadcrumbs
                items={[
                  {
                    href: PUBLIC_ROUTES.HOME,
                    label: "Trang chủ",
                    hideSeperateAfter: true,
                  },
                ]}
                current="Tất cả văn bản"
                titleCenter={true}
              />
              <p className="text-right w-full">
                Có <b>{data.count}</b> văn bản
              </p>
              <div className="grid grid-cols-12 gap-10">
                {rows.map(({ title, slug, issue }) => {
                  return (
                    <Link
                      href={`${PUBLIC_ROUTES.VANBAN}/${slug}`}
                      key={slug}
                      title={title}
                      className="col-span-6"
                    >
                      <p className="hover:text-[var(--mainColor)] font-medium three-dot three-dot-2">
                        {title}
                      </p>
                      <p className="text-sm mt-1 inline-block text-gray-500">
                        Ban hành: {issue}
                      </p>
                    </Link>
                  );
                })}
                {count > 0 ? (
                  <div className="col-span-12">
                    <Pagination
                      className="w-full"
                      listDotsClassName="justify-center"
                      totalPages={total_pages}
                      current={p}
                      onPageChange={handlePageChange}
                    />
                  </div>
                ) : null}
              </div>
            </Flex>
          </Container>
        </MainLayout>
      </AuthLogin>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { p } = context.query;
  try {
    const page = p ? +p : 1;
    const data = await vanbanApi.getAll(page);
    return { props: { data, p: page } };
  } catch (error) {}
  return { notFound: true };
};

export default Page;
