import violationApi from "@/api/violation.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Loading from "@/components/common/Loading";
import MainLayout from "@/components/layouts/MainLayout";
import useQueryString from "@/hooks/useQueryString";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import slugify from "slugify";

type Props = {};

const Search = (props: Props) => {
  const { getString } = useQueryString();

  const keyword = getString("keyword");

  const [loading, setLoading] = useState<boolean>(keyword !== "");
  const [page, setPage] = useState<number>(1);
  const [searchData, setSearchData] = useState<PaginationResponse<Violation>>(
    PAGINATION_RESPONSE_EMPTY
  );

  const fetchSearchResult = async (
    str: string,
    p?: number,
    limit?: number,
    isNext?: boolean
  ) => {
    try {
      const data = await violationApi.search({ keyword: str, p, limit });
      setSearchData({
        ...data,
        ...(isNext ? { rows: [...searchData.rows, ...data.rows] } : {}),
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (keyword !== "")
      fetchSearchResult(keyword, 1, DEFAULT_LIMIT).finally(() => {
        setLoading(false);
      });
  }, [keyword]);

  return (
    <Fragment>
      <Head>
        <title>Kết quả tìm kiếm</title>
      </Head>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <AuthNotFound>
          <MainLayout>
            <Container className="py-2">
              <Breadcrumbs
                items={[
                  {
                    label: "Trang chủ",
                    href: PUBLIC_ROUTES.HOME,
                    hideSeparateAfter: true,
                  },
                ]}
                current="Tìm kiếm"
                titleCenter={true}
              />
              <div className="">
                {searchData.count} Kết quả tìm kiếm với từ khoá "{keyword}"
              </div>
              <Flex className="flex-col !items-start my-4">
                <InfiniteScroll
                  dataLength={searchData.rows.length}
                  next={() => {
                    if (keyword !== "") {
                      fetchSearchResult(keyword, page + 1, DEFAULT_LIMIT, true);
                      setPage(page + 1);
                    }
                  }}
                  hasMore={page < searchData.total_pages}
                  className="flex flex-col gap-3"
                  loader={
                    <div className="overflow-hidden">
                      <Loading />
                    </div>
                  }
                >
                  {searchData.rows.map((row, index) => {
                    const toSlug = slugify(row.name, {
                      replacement: " ",
                      lower: true,
                      locale: "vi",
                    });
                    const toSlugKeyword = slugify(keyword, {
                      replacement: " ",
                      lower: true,
                      locale: "vi",
                    });
                    const i = toSlug.indexOf(toSlugKeyword);
                    return (
                      <Fragment key={row.id}>
                        <Link
                          href={`${PUBLIC_ROUTES.VIOLATIONS}/${row.id}`}
                          className={`group border border-neutral-100 py-3 relative pr-3 pl-10 rounded-sm`}
                          // title={row.content}
                          // title={row.legal.point.name}
                          title={row.name}
                        >
                          <div className="group-hover:text-[var(--mainColor)] absolute top-3 left-3 text-sm">
                            {index + 1}.
                          </div>
                          <p className="three-dot three-dot-3 text-sm font-medium group-hover:text-[var(--mainColor)]">
                            {/* {row.content} */}
                            {/* {row.legal.point.name} */}
                            {row.name.substring(0, i)}
                            <span className="bg-yellow-400">
                              {row.name.substring(i, i + keyword.length)}
                            </span>
                            {row.name.substring(i + keyword.length)}
                          </p>
                          <p className="three-dot three-dot-2 mt-1 text-[12px] text-rose-500">
                            {/* {row.punishment} */}
                            {row.fine}
                          </p>
                        </Link>
                      </Fragment>
                    );
                  })}
                </InfiniteScroll>
              </Flex>
            </Container>
          </MainLayout>
        </AuthNotFound>
      )}
    </Fragment>
  );
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   try {
//     const { keyword } = context.query;
//     const data = await violationApi.getAll({ keyword: `${keyword}` });
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     notFound: true,
//   };
// };

export default Search;
