import violationApi from "@/api/violation.api";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import MainLayout from "@/components/layouts/MainLayout";
import useQueryString from "@/hooks/useQueryString";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import { createQueryString } from "@/utils/helpers";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const Page = (props: Props) => {
  const [data, setData] = useState<PaginationResponse<Violation>>(
    PAGINATION_RESPONSE_EMPTY
  );
  const { getString } = useQueryString();

  const sortBy = getString("sortBy", "content");
  const sortType = getString("sortType", "asc");

  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [selectedOptionValue, setSelectedOptionValue] =
    useState<string>("content-asc");

  const router = useRouter();

  const fetchData = useCallback(
    async (p?: number) => {
      const { id } = router.query;
      return violationApi.getAll({
        // group_violation_id: `${id}`,
        limit: DEFAULT_LIMIT,
        page: p || 1,
        sort_by: sortBy,
        sort_type: sortType,
      });
    },
    [router.query]
  );
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [sortBy, sortType] = value.split("-");
    const queryString = createQueryString({ sortBy, sortType });
    const { id } = router.query;

    router.push(`/nhom-vi-pham/${id}${queryString}`);
  };

  useEffect(() => {
    setLoading(true);
    const { id } = router.query;
    if (id)
      fetchData()
        .then((response) => {
          setData(response);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
  }, [router.query]);

  useEffect(() => {
    if (sortBy !== "" && sortType !== "")
      setSelectedOptionValue(`${sortBy}-${sortType}`);
  }, [sortBy, sortType]);

  const { rows, count, total_pages: totalPages } = data;

  return (
    <Fragment>
      <Head>
        <title>Nhóm vi phạm</title>
      </Head>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <MainLayout>
          <Container className="py-3">
            <h1 className="text-center my-4 text-3xl">Danh sách vi phạm</h1>
            <Flex className="flex-col !items-start ">
              <Flex className="w-full !justify-between">
                <div className="">{count} Vi phạm</div>
                <Flex className="">
                  <div className="whitespace-nowrap">Sắp xếp theo</div>
                  <Select
                    options={[
                      { value: "content-asc", label: "Tên vi phạm A-Z" },
                      { value: "content-desc", label: "Tên vi phạm Z-A" },
                      {
                        value: "apply_for-asc",
                        label: "Đối tượng tham gia vi phạm A-Z",
                      },
                      {
                        value: "apply_for-desc",
                        label: "Đối tượng tham gia vi phạm Z-A",
                      },
                    ]}
                    value={selectedOptionValue}
                    onChange={handleChangeSelect}
                  />
                </Flex>
              </Flex>
              <InfiniteScroll
                dataLength={rows.length}
                next={() => {
                  fetchData(page + 1)
                    .then((response) => {
                      setData({
                        ...response,
                        rows: [...data.rows, ...response.rows],
                      });
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                      setPage(page + 1);
                    });
                }}
                hasMore={page < totalPages}
                className="flex flex-col gap-3"
                loader={
                  <div className="overflow-hidden">
                    <Loading />
                  </div>
                }
              >
                {/* {rows.map((row) => {
                  return (
                    <Fragment key={row.id}>
                      <Link
                        href={`${PUBLIC_ROUTES.VIOLATIONS}/${row.id}`}
                        className="border border-black w-full p-4 cursor-pointer hover:bg-gray-50 block bg-white rounded-sm"
                      >
                        <div className="">Đối tượng: {row.apply_for}</div>
                        <div className="font-bold mt-2">{row.content}</div>
                        <div className="text-red-500 text-sm my-1">
                          {row.punishment}
                        </div>
                        <div className="text-[12px] underline text-blue-500">
                          Xem chi tiết
                        </div>
                      </Link>
                    </Fragment>
                  );
                })} */}
              </InfiniteScroll>
            </Flex>
          </Container>
        </MainLayout>
      )}
    </Fragment>
  );
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { id, page, limit } = context.query;
//   try {
//     const data = await violationApi.getAll({
//       group_violation_id: `${id}`,
//       limit: limit ? +limit : 10,
//       page: page ? +page : 1,
//     });

//     return { props: { data } };
//   } catch (error) {
//     console.log(error);
//     return { props: { data: PAGINATION_RESPONSE_EMPTY } };
//   }
// };

export default Page;
