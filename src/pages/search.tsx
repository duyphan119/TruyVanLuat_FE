import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

type Props = {};

const Search = (props: Props) => {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword");

  return (
    <Fragment>
      <Head>
        <title>Kết quả tìm kiếm</title>
      </Head>
      <MainLayout>
        <Container>
          <div className="">Kết quả tìm kiếm với từ khoá "{keyword}"</div>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export default Search;
