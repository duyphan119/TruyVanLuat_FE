import GroupTrafficSignForm from "@/components/common/GroupTrafficSignForm";
import Paper from "@/components/common/Paper";
import AdminLayout from "@/components/layouts/AdminLayout";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Thêm nhóm biển báo giao thông</title>
      </Head>
      <AdminLayout>
        <Paper title="Thêm nhóm biển báo giao thông">
          <GroupTrafficSignForm />
        </Paper>
      </AdminLayout>
    </React.Fragment>
  );
};

export default Page;
