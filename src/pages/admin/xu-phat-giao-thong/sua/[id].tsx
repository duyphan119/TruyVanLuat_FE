import violationApi from "@/api/violation.api";
import AuthRedirect from "@/components/auth/AuthRedirect";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import Paper from "@/components/common/Paper";
import ViolationForm from "@/components/form/ViolationForm";
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
  const [is404, setIs404] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (id) {
      let isMounted = true;
      violationApi
        .getById(`${id}`)
        .then((res) => {
          if (isMounted) {
            if (!res) {
              setIs404(true);
            } else {
              setData(res);
            }
          }
        })
        .catch((error) => {
          setIs404(true);
        })
        .finally(() => {
          setLoading(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [id]);

  if (loading) return <Loading fullScreen={true} />;
  if (!loading && is404) return <NotFound />;

  return (
    <React.Fragment>
      <Head>
        <title>Xử phạt giao thông</title>
      </Head>
      <AuthRedirect>
        <AdminLayout>
          <Paper title="Sửa thông tin xử phạt">
            {data ? <ViolationForm data={data} /> : null}
          </Paper>
        </AdminLayout>
      </AuthRedirect>
    </React.Fragment>
  );
};

export default Page;
