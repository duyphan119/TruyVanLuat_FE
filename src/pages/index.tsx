import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Input from "@/components/common/Input";
import MainLayout from "@/components/layouts/MainLayout";
import API from "@/config/api";
import useQueryString from "@/hooks/useQueryString";
import Infringe from "@/types/infringe/Infringe";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const { getString } = useQueryString();

  const keywordQueryString = getString("keyword");

  const [results, setResults] = useState<Infringe[]>([]);

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { keyword } = values;
    router.push(`?keyword=${keyword}`);
  };

  useEffect(() => {
    (async () => {
      const api = new API("http://localhost:5000");
      try {
        if (keywordQueryString !== "") {
          const data = await api.get("search", {
            params: { keyword: keywordQueryString },
          });
          setResults(data);
        }
        setValue("keyword", keywordQueryString);
      } catch (error) {}
    })();
  }, [keywordQueryString]);

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
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="search"
                  placeholder="Nhập từ khoá cần tìm..."
                  startIcon={FaSearch}
                  register={register("keyword")}
                  id="keyword"
                  size="medium"
                />
              </form>
            </Flex>
            {keywordQueryString !== "" ? (
              <>
                <div className="mt-5 mb-3">
                  {results.length} Kết quả tìm kiếm với từ khoá: "
                  {keywordQueryString}"
                </div>
                <Flex className="flex-col !items-start">
                  {results.map((result) => {
                    return (
                      <div
                        className="border border-black w-full p-4"
                        key={result.noiDung}
                      >
                        <div className="font-bold">{result.noiDung}</div>
                        <div className="text-red-500 text-sm my-1">
                          Phạt từ <b>{result.phatTu}</b> {result.donVi} đến{" "}
                          <b>{result.phatDen}</b> {result.donVi}
                        </div>
                        <Flex className="!gap-1 text-[12px]">
                          <span className="">Xem chi tiết:</span>
                          <Link
                            href={`/xu-phat`}
                            className=" underline text-blue-500 hover:text-blue-600"
                          >
                            {/* {[
                              result.diem ? "Điểm " + result.diem : "",
                              result.khoan ? "Khoản " + result.khoan : "",
                              result.dieu ? "Điều " + result.dieu : "",
                              // result.muc ? "Mục " + result.muc : "",
                              result.nghiDinh
                                ? "Nghị định " + result.nghiDinh
                                : "",
                            ].join(" ")} */}
                            {result.xemChiTiet}
                          </Link>
                        </Flex>
                        {result.suaDoiBoi ? (
                          <Flex className="!gap-1 text-[12px]">
                            <span className="text-red-500">Sửa đổi bởi</span>
                            <Link
                              href={`/xu-phat`}
                              className="underline text-blue-500 hover:text-blue-600"
                            >
                              {/* {[
                                result.suaDoiBoiDiem
                                  ? "Điểm " + result.suaDoiBoiDiem
                                  : "",
                                result.suaDoiBoiKhoan
                                  ? "Khoản " + result.suaDoiBoiKhoan
                                  : "",
                                result.suaDoiBoiDieu
                                  ? "Điều " + result.suaDoiBoiDieu
                                  : "",
                                // result.suaDoiBoiMuc
                                //   ? "Mục " + result.suaDoiBoiMuc
                                //   : "",
                                result.suaDoiBoiNghiDinh
                                  ? "Nghị định " + result.suaDoiBoiNghiDinh
                                  : "",
                              ].join(" ")} */}
                              {result.suaDoiBoi}
                            </Link>
                          </Flex>
                        ) : null}
                      </div>
                    );
                  })}
                </Flex>
              </>
            ) : null}
          </Container>
        </div>
      </MainLayout>
    </Fragment>
  );
}
