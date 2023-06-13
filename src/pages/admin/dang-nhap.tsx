import AuthNotFound from "@/components/auth/AuthNotFound";
import AuthRedirect from "@/components/auth/AuthRedirect";
import AuthForm from "@/components/form/AuthForm";
import { WEBSITE_TITLE } from "@/utils/constants";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập | {WEBSITE_TITLE}</title>
      </Head>
      <AuthRedirect>
        <main className="w-screen h-screen flex items-center justify-center">
          <AuthForm isAdminForm={true} />
        </main>
      </AuthRedirect>
    </React.Fragment>
  );
};

export default Page;
