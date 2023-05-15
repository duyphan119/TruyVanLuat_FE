import groupViolationApi from "@/api/groupViolation.api";
import violationApi from "@/api/violation.api";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import InfringeModal from "@/components/InfringeModal";
import MainLayout from "@/components/layouts/MainLayout";
import API from "@/config/api";
import useComponentVisible from "@/hooks/useComponentVisible";
import useQueryString from "@/hooks/useQueryString";
import Infringe from "@/types/infringe/Infringe";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

type Result = {
  rows: Infringe[];
  count: number;
  total_pages: number;
};

export default function Home() {
  const router = useRouter();

  const { getString } = useQueryString();

  const keywordQueryString = getString("keyword");

  const [result, setResult] = useState<PaginationResponse<Violation>>(
    PAGINATION_RESPONSE_EMPTY
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { keyword } = values;
    router.push(`?keyword=${keyword}`);
  };

  const fetchSearchResult = (
    str: string,
    p?: number,
    limit?: number,
    isNext?: boolean
  ) => {
    return violationApi.search(str, p, limit).then((data) => {
      setResult({
        ...data,
        ...(isNext ? { rows: [...result.rows, ...data.rows] } : {}),
      });
    });
  };

  useEffect(() => {
    if (keywordQueryString !== "") {
      setLoading(true);
      fetchSearchResult(keywordQueryString, 1, DEFAULT_LIMIT).finally(() => {
        setLoading(false);
      });
      setValue("keyword", keywordQueryString);
    }
  }, [keywordQueryString]);

  console.log(result.rows.length);

  return (
    <Fragment>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <MainLayout>
        <div className="home">
          <Container className="py-2">
            <Flex className="flex-col">
              <h1 className="text-3xl font-semibold">Truy vấn</h1>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="search"
                  startIcon={FaSearch}
                  placeholder="Nhập từ khoá cần tìm..."
                  register={register("keyword")}
                  id="keyword"
                  size="medium"
                />
              </form>
            </Flex>
            {!loading && keywordQueryString !== "" ? (
              <>
                <div className="mt-5 mb-3">
                  {result.count} Kết quả tìm kiếm với từ khoá: "
                  {keywordQueryString}"
                </div>
                <Flex className="flex-col !items-start">
                  <InfiniteScroll
                    dataLength={result.rows.length}
                    next={() => {
                      if (keywordQueryString !== "") {
                        fetchSearchResult(
                          keywordQueryString,
                          page + 1,
                          DEFAULT_LIMIT,
                          true
                        );
                        setPage(page + 1);
                      }
                    }}
                    hasMore={page < result.total_pages}
                    className="flex flex-col gap-3"
                    loader={<div className="text-center">Đang tải...</div>}
                  >
                    {result.rows.map((result) => {
                      return (
                        <Fragment key={result.id}>
                          <Link
                            href={`${PUBLIC_ROUTES.VIOLATIONS}/${result.id}`}
                            className="border border-black w-full p-4 cursor-pointer hover:bg-gray-50 block"
                          >
                            <div className="">
                              Đối tượng: {result.apply_for}
                            </div>
                            <div className="font-bold mt-2">
                              {result.content}
                            </div>
                            <div className="text-red-500 text-sm my-1">
                              {result.punishment}
                            </div>
                            <div className="text-[12px] underline text-blue-500">
                              Xem chi tiết
                            </div>
                          </Link>
                        </Fragment>
                      );
                    })}
                  </InfiniteScroll>
                </Flex>
              </>
            ) : null}
          </Container>
        </div>
      </MainLayout>
    </Fragment>
  );
}
