import NotFound from "@/components/common/NotFound";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>404: Trang này không tồn tại</title>
      </Head>
      <NotFound />
    </React.Fragment>
  );
};

export default Page;
