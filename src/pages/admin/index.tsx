import AuthRedirect from "@/components/auth/AuthRedirect";
import AdminLayout from "@/components/layouts/AdminLayout";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <AuthRedirect>
      <Head>
        <title>Bảng điều khiển</title>
      </Head>
      <AdminLayout>Test Admin</AdminLayout>
    </AuthRedirect>
  );
};

export default Page;
