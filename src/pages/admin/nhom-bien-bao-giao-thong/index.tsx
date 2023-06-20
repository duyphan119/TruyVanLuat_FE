import groupTrafficSignApi from "@/api/groupTrafficSign.api";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import Paper from "@/components/common/Paper";
import AdminLayout from "@/components/layouts/AdminLayout";
import useQueryString from "@/hooks/useQueryString";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import PaginationResponse from "@/types/response/PaginationResponse";
import {
  DASHBOARD,
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

type Props = {};

const rows: GroupTrafficSign[] = new Array(14).fill("").map((_, index) => ({
  id: "" + index,
  name: "Biển báo " + index,
  effect: "Biển báo " + index + " là cái gì đó",
  description: "Mô tả " + index,
}));

const Page = (props: Props) => {
  const router = useRouter();

  const { getNumber } = useQueryString();
  const p = getNumber("p", 1);
  const limit = getNumber("limit", DEFAULT_LIMIT);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<PaginationResponse<GroupTrafficSign>>(
    PAGINATION_RESPONSE_EMPTY
  );

  React.useEffect(() => {
    let isMounted = true;
    groupTrafficSignApi
      .getAll({ p, limit })
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
        <title>Danh sách nhóm biển báo giao thông</title>
      </Head>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <AdminLayout>
          <Paper
            title="Nhóm biển báo giao thông"
            className="overflow-hidden"
            style={{
              maxHeight: `calc(100vh - ${DASHBOARD.HEADER_HEIGHT + 48}px)`,
            }}
          >
            <DataTable
              cols={[
                {
                  label: "Tên",
                  key: "name",
                  className: "text-left",
                },
                {
                  label: "Tác dụng",
                  key: "effect",
                  className: "text-left",
                },
                {
                  label: "",
                  key: "actions",
                  render: (model: GroupTrafficSign) => (
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`${PROTECTED_ROUTES.GROUP_TRAFFIC_SIGNS}/sua/${model.id}`}
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
                link: `${PROTECTED_ROUTES.GROUP_TRAFFIC_SIGNS}/them`,
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
      )}
    </React.Fragment>
  );
};

export default Page;
