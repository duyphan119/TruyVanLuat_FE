import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import { Fragment } from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Liên hệ</title>
      </Head>
      <MainLayout>
        <Container>Contact</Container>
      </MainLayout>
    </Fragment>
  );
};

export default Contact;
