import AdminLayout from "@/components/layouts/AdminLayout";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Bảng điều khiển</title>
      </Head>
      <AdminLayout>Test Admin</AdminLayout>
    </React.Fragment>
  );
};

export default Page;
