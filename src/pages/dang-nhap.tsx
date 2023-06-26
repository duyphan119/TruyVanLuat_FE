import AuthNotFound from "@/components/auth/AuthNotFound";
import AuthForm from "@/components/form/AuthForm";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <AuthNotFound requireNoLogin={true}>
        <MainLayout hideFooter>
          <div className="mt-40 flex items-center justify-center">
            <AuthForm />
          </div>
        </MainLayout>
      </AuthNotFound>
    </React.Fragment>
  );
};

export default Page;
