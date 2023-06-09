import AuthLogin from "@/components/auth/AuthLogin";
import AuthForm from "@/components/form/AuthForm";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <AuthLogin requireNoLogin={true}>
        <main className="w-screen h-screen flex items-center justify-center">
          <AuthForm />
        </main>
      </AuthLogin>
    </React.Fragment>
  );
};

export default Page;
