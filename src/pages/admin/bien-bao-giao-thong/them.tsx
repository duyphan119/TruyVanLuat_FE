import TrafficSignForm from "@/components/common/TrafficSignForm";
import Paper from "@/components/common/Paper";
import AdminLayout from "@/components/layouts/AdminLayout";
import Head from "next/head";
import React from "react";
import groupTrafficSignApi from "@/api/groupTrafficSign.api";
import PaginationResponse from "@/types/response/PaginationResponse";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import { PAGINATION_RESPONSE_EMPTY } from "@/utils/constants";

type Props = {};

const Page = (props: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [groupTrafficSignData, setGroupTrafficSignData] = React.useState<
    PaginationResponse<GroupTrafficSign>
  >(PAGINATION_RESPONSE_EMPTY);

  React.useEffect(() => {
    let isMounted = true;
    Promise.all([groupTrafficSignApi.getAll()])
      .then(([res1]) => {
        if (isMounted) {
          setGroupTrafficSignData(res1);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Thêm biển báo giao thông</title>
      </Head>
      <AdminLayout>
        <Paper title="Thêm biển báo giao thông">
          <TrafficSignForm groupTrafficSigns={groupTrafficSignData.rows} />
        </Paper>
      </AdminLayout>
    </React.Fragment>
  );
};

export default Page;
