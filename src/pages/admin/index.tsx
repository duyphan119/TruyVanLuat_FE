import AuthRedirect from "@/components/auth/AuthRedirect";
import AdminLayout from "@/components/layouts/AdminLayout";
import { WEBSITE_TITLE } from "@/utils/constants";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <AuthRedirect>
      <Head>
        <title>Bảng điều khiển | {WEBSITE_TITLE}</title>
      </Head>
      <AdminLayout>Test Admin</AdminLayout>
    </AuthRedirect>
  );
};

export default Page;
