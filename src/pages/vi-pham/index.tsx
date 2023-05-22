import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import React, { Fragment } from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Tất cả vi phạm</title>
      </Head>
      <MainLayout>
        <Container></Container>
      </MainLayout>
    </Fragment>
  );
};

export default Page;
