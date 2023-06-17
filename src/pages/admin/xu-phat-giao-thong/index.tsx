import Head from "next/head";
import React from "react";
import {
  WEBSITE_TITLE,
  DASHBOARD,
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PROTECTED_ROUTES,
} from "@/utils/constants";
import AdminLayout from "@/components/layouts/AdminLayout";
import Paper from "@/components/common/Paper";
import AuthRedirect from "@/components/auth/AuthRedirect";
import { useRouter } from "next/router";
import useQueryString from "@/hooks/useQueryString";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import violationApi from "@/api/violation.api";
import DataTable from "@/components/common/DataTable";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const { getNumber } = useQueryString();
  const p = getNumber("p", 1);
  const limit = getNumber("limit", DEFAULT_LIMIT);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<PaginationResponse<Violation>>(
    PAGINATION_RESPONSE_EMPTY
  );

  React.useEffect(() => {
    let isMounted = true;
    violationApi
      .search({ keyword: "", p, limit })
      .then((res) => {
        if (isMounted) {
          setData(res);
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
  }, [p, limit]);
  return (
    <React.Fragment>
      <Head>
        <title>Xử phạt giao thông | {WEBSITE_TITLE}</title>
      </Head>
      <AuthRedirect>
        <AdminLayout>
          <Paper
            title="Xử phạt giao thông"
            className="overflow-hidden"
            style={{
              maxHeight: `calc(100vh - ${DASHBOARD.HEADER_HEIGHT + 48}px)`,
            }}
          >
            <DataTable
              cols={[
                {
                  label: "Nội dung",
                  key: "content",
                  className: "text-left",
                },
                {
                  label: "Luật",
                  key: "legal",
                  className: "text-left",
                },
                {
                  label: "Hành động",
                  key: "actions",
                  render: (model: Violation) => (
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`${PROTECTED_ROUTES.VIOLATIONS}/sua/${model.id}`}
                        className="text-indigo-500"
                        title="Sửa"
                      >
                        <MdEdit size={20} />
                      </Link>
                      <button className="text-rose-500" title="Xoá">
                        <MdDelete size={20} />
                      </button>
                    </div>
                  ),
                },
              ]}
              rows={data.rows}
              hasColIndex={true}
              newDataButton={{
                link: `${PROTECTED_ROUTES.VIOLATIONS}/them`,
              }}
              pagination={{
                count: data.count,
                current: p,
                pageSize: limit,
                onPageChange: (page) => {
                  //
                },
              }}
            />
          </Paper>
        </AdminLayout>
      </AuthRedirect>
    </React.Fragment>
  );
};

export default Page;
