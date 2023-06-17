import violationApi from "@/api/violation.api";
import AuthRedirect from "@/components/auth/AuthRedirect";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import Paper from "@/components/common/Paper";
import AdminLayout from "@/components/layouts/AdminLayout";
import Violation from "@/types/violation/Violation";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Violation | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    violationApi
      .getById(`${id}`)
      .then((res) => {
        if (isMounted) {
          setData(res);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!loading && !data) return <NotFound />;

  console.log(data);

  return (
    <React.Fragment>
      <Head>
        <title>Xử phạt giao thông</title>
      </Head>
      <AuthRedirect>
        {data ? (
          <AdminLayout>
            <Paper title="Sửa thông tin xử phạt"></Paper>
          </AdminLayout>
        ) : loading ? (
          <Loading fullScreen={true} />
        ) : (
          <></>
        )}
      </AuthRedirect>
    </React.Fragment>
  );
};

export default Page;
