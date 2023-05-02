import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import { Fragment } from "react";

type Props = {};

const Overview = (props: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Giới thiệu</title>
      </Head>
      <MainLayout>
        <Container>Overview</Container>
      </MainLayout>
    </Fragment>
  );
};

export default Overview;
